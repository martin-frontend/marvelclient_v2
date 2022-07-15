import axios from "axios";
import { GameConfigVO } from "../../vo/GameConfigVO";
import GlobalVar from "../global/GlobalVar";
import { Base64 } from "js-base64";
import NotificationName from "../NotificationName";
import LangUtil from "../global/LangUtil";

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
                core.host = this.config.ApiUrl || this.getApiUrl();
                puremvc.Facade.getInstance().sendNotification(NotificationName.GAME_CONFIG);
                return;
            } catch (e) {
                console.log("native platformConfig error");
            }
        }

        if (core.plat_id) {
            const fileName: string = new core.MD5().hex_md5("plat-" + core.plat_id);
            const url = `${core.cdnUrl}/resource/client_config/${fileName}.json?${Math.random()}`;
            axios
                .get(url)
                .then((response: any) => {
                    this.config = response.data;
                    core.host = this.config.ApiUrl || this.getApiUrl();
                    puremvc.Facade.getInstance().sendNotification(NotificationName.GAME_CONFIG);
                })
                .catch(() => {
                    alert(LangUtil("平台配置文件获取失败"));
                    window.location.reload();
                });
        } else {
            this.getChannelConfig();
        }
    }

    static getChannelConfig() {
        let hostname = location.hostname;
        if (process.env.NODE_ENV == "development") {
            hostname = "www.cftest666.com";
        }
        // hostname = "www.cftest666.com";
        const fileName: string = new core.MD5().hex_md5(hostname);
        const url = `${core.cdnUrl}/resource/game_address/${fileName}.json?${Math.random()}`;
        axios
            .get(url)
            .then((response: any) => {
                core.channel_id = response.data.channels;
                core.plat_id = response.data.platform;
                this.load();
            })
            .catch(() => {
                alert(LangUtil("渠道配置文件获取失败"));
                window.location.reload();
            });
    }

    static getApiUrl(): string {
        let apiUrl = "";
        const origin = location.origin;
        if (origin.indexOf("www") == -1) {
            apiUrl = origin.replace("://", "://api.");
        } else {
            apiUrl = origin.replace("www", "api");
        }
        return apiUrl;
    }
}
