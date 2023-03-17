import axios from "axios";
import { GameConfigVO } from "../../vo/GameConfigVO";
import GlobalVar from "../global/GlobalVar";
import { Base64 } from "js-base64";
import NotificationName from "../NotificationName";
import LangUtil from "../global/LangUtil";
import { getFileVersion } from "../global/Functions";

export default class GameConfig {
    static config: GameConfigVO;

    static load() {
        const platformConfig = core.getQueryVariable("platformConfig");
        let plat_id = core.getQueryVariable("plat_id");
        let channel_id = core.getQueryVariable("channel_id");
        const channelCode = core.getQueryVariable("channelCode");
        if (channelCode && channelCode.length == 8) {
            plat_id = channelCode.substring(0, 5);
            channel_id = channelCode;
        }
        plat_id && (core.plat_id = plat_id);
        channel_id && (core.channel_id = channel_id);
        if (platformConfig) {
            if (platformConfig) {
                core.app_type = core.EnumAppType.APP;
            } else {
                core.app_type = core.EnumAppType.WEB;
            }
            const conf: string = decodeURI(platformConfig);
            try {
                const configstr: string = Base64.decode(conf);
                this.config = JSON.parse(configstr);
                // core.host = this.config.ApiUrl || this.getApiUrl();
                // puremvc.Facade.getInstance().sendNotification(NotificationName.GAME_CONFIG);
                // return;
            } catch (e) {
                console.log("native platformConfig error");
            }
        }

        core.host = this.getApiUrl();

        const data = {
            game_domain: core.game_domain,
        };
        // skin005获取配置文件的方式不同
        let url = "";
        let myAxios;
        if (GlobalVar.game_address_method == 1) {
            url = `/resource/game_address/${core.MD5.createInstance().hex_md5(core.game_domain)}.json?${getFileVersion()}`;
            if (process.env.VUE_APP_ENV == "production") {
                // url = location.origin + url;
                url = location.protocol + "//uxdz.wfxdmj1990.com" + url;
            } else {
                url = "https://sftpuser.testjj9.com" + url;
            }
            myAxios = axios.get(url);
        } else {
            url = core.host + "/api/game_address";
            myAxios = axios.post(url, data);
        }

        myAxios
            .then((response: any) => {
                const data = response.data.data ?? response.data;
                console.log("__game_address", data);
                if (!core.plat_id) core.plat_id = data.plat_id;
                if (!core.channel_id) core.channel_id = data.channel_id;

                if (!core.plat_id || !core.channel_id) {
                    alert("game_address_data_error");
                    return;
                }

                core.cdnUrl = data.cdn_domain;
                GlobalVar.host_urls = data.api_domain;
                // if (data.api_domain) core.host = data.api_domain;
                core.host = "";
                puremvc.Facade.getInstance().sendNotification(NotificationName.CHECK_SPEED);
            })
            .catch((e) => {
                //alert(e);
                alert("get game_address fail");
            });
    }

    static loadPlatConfig() {
        const url = net.getUrl(net.HttpType.api_plat_var_config, { plat_id: core.plat_id });
        net.Http.request({}, url)
            .then((response: any) => {
                GameConfig.config = response.data;
                puremvc.Facade.getInstance().sendNotification(NotificationName.GAME_CONFIG);
            })
            .catch(() => {
                alert(LangUtil("平台配置文件获取失败"));
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
                    const origin = location.origin;
                    if (origin.indexOf("www") == -1) {
                        apiUrl = origin.replace("://", "://api.");
                    } else {
                        apiUrl = origin.replace("www", "api");
                    }
                } else {
                    apiUrl = "http://" + location.hostname + ":28001";
                }
            } else {
                apiUrl = "https://api.testjj9.com";
            }
        }
        return apiUrl;
    }
    /**获取cdn地址 */
    static getCdnUrl(): string {
        let apiUrl = "";
        const origin = location.origin;
        if (origin.indexOf("www") == -1) {
            apiUrl = origin.replace("://", "://static.");
        } else {
            apiUrl = origin.replace("www", "static");
        }
        return apiUrl;
    }
}
