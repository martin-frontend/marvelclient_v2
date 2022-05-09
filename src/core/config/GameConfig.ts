import axios from "axios";
import { GameConfigVO } from "../../vo/GameConfigVO";
import NotificationName from "../NotificationName";

export default class GameConfig {
    static config: GameConfigVO;

    static load() {
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
