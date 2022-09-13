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
        const plat_id = core.getQueryVariable("plat_id");
        const channel_id = core.getQueryVariable("channel_id");
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
        axios.post(core.host + "/api/game_address", data).then((response: any) => {
            const data = response.data.data;
            if (!core.plat_id) core.plat_id = data.plat_id;
            if (!core.channel_id) core.channel_id = data.channel_id;
            core.cdnUrl = data.cdn_domain;
            GlobalVar.host_urls = data.api_domain;
            // if (data.api_domain) core.host = data.api_domain;
            core.host = "";
            puremvc.Facade.getInstance().sendNotification(NotificationName.CHECK_SPEED);
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
                apiUrl = "http://api.starsabc.com";
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
