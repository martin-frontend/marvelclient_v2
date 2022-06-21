import axios from "axios";
import { GameConfigVO } from "../../vo/GameConfigVO";
import GlobalVar from "../global/GlobalVar";
import { Base64 } from "js-base64";
import NotificationName from "../NotificationName";

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
                    if (response.data.status == 0) {
                        this.config = response.data;
                        console.log(this.config);
                    }
                    puremvc.Facade.getInstance().sendNotification(NotificationName.GAME_CONFIG);
                })
                .catch(() => {
                    alert("平台配置文件获取失败");
                    window.location.reload();
                });
        } else {
            this.getChannelConfig();
        }
    }

    static getChannelConfig() {
        const fileName: string = new core.MD5().hex_md5(location.hostname);
        const url = `${core.cdnUrl}/resource/game_address/${fileName}.json?${Math.random()}`;
        axios
            .get(url)
            .then((response: any) => {
                const json = JSON.parse(response);
                core.channel_id = json.channels;
                core.plat_id = json.platform;
                this.load();
            })
            .catch(() => {
                alert("渠道配置文件获取失败");
                window.location.reload();
            });
    }
}
