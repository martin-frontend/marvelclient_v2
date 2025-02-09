import axios from "axios";
import { GameConfigVO } from "../../vo/GameConfigVO";
import GlobalVar from "../global/GlobalVar";
import { Base64 } from "js-base64";
import NotificationName from "../NotificationName";
import LangUtil from "../global/LangUtil";
import { decode_url, getFileVersion, getVersion } from "../global/Functions";
import Vue from "vue";
import { track_error_event } from "@/core/config/ErrorEvent";

export default class GameConfig {
    static config: GameConfigVO;

    static load() {
        let platformConfig = core.getQueryVariable("platformConfig");
        //老版本，读取URL参数
        let plat_id = core.getQueryVariable("plat_id");
        let channel_id = core.getQueryVariable("channel_id");
        const channelCode = core.getQueryVariable("channelCode");
        if (channelCode && channelCode.length == 8) {
            plat_id = channelCode.substring(0, 5);
            channel_id = channelCode;
        }
        const ma_token = core.getQueryVariable("ma_token");
        if (ma_token && ma_token.trim()) {
            core.other_params = decode_url(window.location.search.substring(1));
        }
        //新版本，读取URL参数
        const isProduction = process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV == "production";
        const channelStr = (isProduction ? location.pathname : location.hash).split("/")[1];
        if (channelStr && !isNaN(Number(channelStr))) {
            plat_id = channelStr.substring(0, 5);
            channel_id = channelStr;
            console.warn("plat_id: ", plat_id, "----channel_id: ", channel_id);
        }

        plat_id && (core.plat_id = plat_id);
        channel_id && (core.channel_id = channel_id);

        if (!platformConfig) {
            platformConfig = window.localStorage.getItem("platformConfig_app") || "";
        }
        if (platformConfig) {
            window.localStorage.setItem("platformConfig_app", platformConfig);
            core.app_type = core.EnumAppType.APP;

            const conf: string = decodeURI(platformConfig);
            try {
                const configstr: string = Base64.decode(conf);
                this.config = JSON.parse(configstr);
                // core.host = this.config.ApiUrl || this.getApiUrl();
                // puremvc.Facade.getInstance().sendNotification(NotificationName.GAME_CONFIG);
                // return;
            } catch (e) {
                console.log("native platformConfig error");
                track_error_event(
                    { msg: "native platformConfig error", url: "", virsion_client: getVersion(), plat_id: plat_id, channel_id: channel_id },
                    "gameaddressfail"
                );
                this.onGetAddressFail();
            }
        } else {
            const app_type = core.getQueryVariable("app_type");
            core.app_type = app_type ? parseInt(app_type) : core.EnumAppType.WEB;
        }

        core.host = this.getApiUrl();
        core.app_plat_type = this.getAppPlatType();

        const data = {
            game_domain: core.game_domain,
        };
        // skin101获取配置文件的方式不同
        let url = "";
        let myAxios;
        if (GlobalVar.game_address_method == 1) {
            url = `/resource/game_address/${core.MD5.createInstance().hex_md5(core.game_domain)}.json?${getFileVersion()}`;
            if (process.env.VUE_APP_ENV == "production") {
                // url = location.origin + url;
                url = location.protocol + "//cdew.p8a432s.pro" + url;
            } else {
                url = "https://sftpuser.testjj9.com" + url;
            }
            myAxios = axios.get(url);
        } else {
            url = core.host + "/api/game_address";
            myAxios = axios.post(url, data);
        }

        return myAxios
            .then((response: any) => {
                const data = response.data.data ?? response.data;
                console.log("__game_address", data);
                if (!core.plat_id) core.plat_id = data.plat_id;
                if (!core.channel_id) core.channel_id = data.channel_id;

                if (!data || Object.keys(data).length < 1 || !core.plat_id || !core.channel_id) {
                    track_error_event(
                        { msg: "渠道或者平台为空", url: url, virsion_client: getVersion(), plat_id: plat_id, channel_id: channel_id },
                        "gameaddressfail"
                    );
                    alert("game_address_data_error");
                    this.onGetAddressFail();
                    return;
                }

                core.cdnUrl = data.cdn_domain;
                GlobalVar.host_urls = data.api_domain;
                // if (data.api_domain) core.host = data.api_domain;
                core.host = "";
                puremvc.Facade.getInstance().sendNotification(NotificationName.CHECK_SPEED);
                this.onGetAddressSuccess();

                if (data && data.ip_veri && data.ip_veri.is_allowed == false) {
                    if (GlobalVar.skin == "skin020") {
                        const cururl =
                            process.env.VUE_APP_ENV != "production" && process.env.VUE_APP_ENV != "development"
                                ? "forbidden/index_dev.html"
                                : "forbidden/index.html";
                        window.location.href = `${cururl}?${data.ip_veri.IP}`;
                    }
                }
            })
            .catch((e) => {
                track_error_event({ msg: e, url: url, virsion_client: getVersion(), plat_id: plat_id, channel_id: channel_id }, "gameaddressfail");
                alert("get game_address fail");
                this.onGetAddressFail();
            });
    }
    /** 获取应用平台的类型 */
    static getAppPlatType(): core.EnumPlatType {
        //判断是否为app
        if (core.app_type == core.EnumAppType.APP) {
            if (core.isAndroid()) {
                return core.EnumPlatType.APP_ANDROID;
            } else if (core.isIOS()) {
                return core.EnumPlatType.APP_IOS;
            } else {
                return core.EnumPlatType.APP_PC;
            }
        }
        //不是手机
        if (!core.isMobile()) {
            //@ts-ignore
            if (window.navigator.standalone === true || this.isAndroidFullScreen()) {
                return core.EnumPlatType.STANDALONE_PC;
            }
            return core.EnumPlatType.WEB_PC;
        }
        //是否已经保存，或者全屏
        //@ts-ignore
        if (window.navigator.standalone === true) {
            return core.EnumPlatType.STANDALONE_IOS;
        }

        if (this.isAndroidFullScreen()) {
            return core.EnumPlatType.STANDALONE_ANDROID;
        }

        if (core.isIOS()) {
            return core.EnumPlatType.WEB_IOS;
        }
        if (core.isAndroid()) {
            return core.EnumPlatType.WEB_ANDROID;
        }

        return core.EnumPlatType.TYPE_NULL;
    }
    // 检查是否在安卓全屏模式下运行
    static isAndroidFullScreen() {
        return window.matchMedia("(display-mode: fullscreen)").matches || window.matchMedia("(display-mode: standalone)").matches;
    }

    static failHandle = 0;
    static onGetAddressFail() {
        if (this.failHandle) {
            clearTimeout(this.failHandle);
        }
        //10秒之后 重新加载
        this.failHandle = setTimeout(() => {
            window.location.reload();
        }, 10000);
    }
    static onGetAddressSuccess() {
        if (this.failHandle) {
            clearTimeout(this.failHandle);
        }
    }
    /**根据发送过来的 渠道 参数 对当前gameconfig中的参数 重新赋值 */
    static resetConfigFromChannel(data: any) {
        /**先判断空 */
        if (!data.ChannelConfig) return;
        const keys = Object.keys(data.ChannelConfig);
        if (keys.length < 1) return;

        let channelConfig;
        /**查找当前 对应 渠道的 参数 是否有 */
        for (let index = 0; index < keys.length; index++) {
            if (keys[index] + "" == core.channel_id) {
                channelConfig = data.ChannelConfig[keys[index]];
                break;
            }
        }
        /**判断是否为空 */
        if (!channelConfig) return;
        const channelKeys = Object.keys(channelConfig);
        if (channelKeys.length < 1) return;
        /**赋值 */
        for (let index = 0; index < channelKeys.length; index++) {
            const element = channelKeys[index];
            //@ts-ignore
            GameConfig.config[element] = channelConfig[element];
        }
        console.log("重新赋值 之后的config", GameConfig.config);
    }
    static loadPlatConfig() {
        const url = net.getUrl(net.HttpType.api_plat_var_config, { plat_id: core.plat_id });
        net.Http.request({}, url)
            .then((response: any) => {
                GameConfig.config = response.data;
                if (!GameConfig.config.mybet_total) {
                    GameConfig.config.mybet_total = {
                        pageTotal: 1,
                        total_bet_gold: 1,
                        total_valid_bet_gold: 1,
                        total_win_gold: 1,
                        total_water: 1,
                    };
                }
                if (!GameConfig.config.mybet_title) {
                    GameConfig.config.mybet_title = {
                        order_no: 1,
                        vendor_product_name: 1,
                        coin_name_unique: 1,
                        bet_gold: 1,
                        win_gold: 1,
                        valid_bet_gold: 1,
                        water: 1,
                        settlement_status: 1,
                        bet_at: 1,
                        settlement_at: 1,
                    };
                }
                this.resetConfigFromChannel(response.data);
                puremvc.Facade.getInstance().sendNotification(NotificationName.GAME_CONFIG);
            })
            .catch(() => {
                track_error_event(
                    {
                        msg: "请求平台config失败或者错误",
                        url: url,
                        virsion_client: getVersion(),
                        plat_id: core.plat_id,
                        channel_id: core.channel_id,
                    },
                    "gameaddressfail"
                );
                alert(LangUtil("Failed to get platform configuration file"));
                window.location.reload();
            });
    }

    static getApiUrl(): string {
        //@ts-ignore
        let apiUrl = window.api_url;
        if (!apiUrl) {
            if (process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV != "h5") {
                const port = location.port;
                if (port == "") {
                    if (core.game_domain.indexOf("www") == -1) {
                        // apiUrl = origin.replace("://", "://api.");
                        apiUrl = location.protocol + "//api." + core.game_domain;
                    } else {
                        // apiUrl = origin.replace("www", "api");
                        apiUrl = location.protocol + "//" + core.game_domain.replace("www", "api");
                    }
                } else {
                    // apiUrl = "http://" + location.hostname + ":28001";
                    apiUrl = "http://" + core.game_domain + ":28001";
                }
            } else {
                apiUrl = "https://api.testjj9.com";
                // apiUrl = "https://api.96.com";
            }
        }
        return apiUrl;
    }
    /**获取cdn地址 */
    static getCdnUrl(): string {
        let apiUrl = "";
        if (core.game_domain.indexOf("www") == -1) {
            // apiUrl = origin.replace("://", "://static.");
            apiUrl = location.protocol + "//static." + core.game_domain;
        } else {
            // apiUrl = origin.replace("www", "static");
            apiUrl = location.protocol + "//" + core.game_domain.replace("www", "static");
        }
        return apiUrl;
    }
    /**是否允许切换时区 */
    static get timezoneChange() {
        if (GameConfig && GameConfig.config && GameConfig.config.modules_switch && GameConfig.config.modules_switch["TimezoneChange"] == 1) {
            return true;
        }

        return false;
    }
}
