import axios from "axios";
import NotificationName from "../NotificationName";

export default class LangConfig {
    static config: any;

    static load() {
        const file_name = core.MD5.createInstance().hex_md5(`plat-${core.plat_id}-${core.lang}-1`);
        const url = `${core.cdnUrl}/resource/language_web/${file_name}.json?`+Math.random();
        axios
            .get(url)
            .then((response: any) => {
                this.config = response.data;
                puremvc.Facade.getInstance().sendNotification(NotificationName.LANG_CONFIG);
            })
            .catch(() => {
                alert("语言包获取失败");
                window.location.reload();
            });
    }
}
