import axios from "axios";
import NotificationName from "../NotificationName";

export default class LangConfig {
    //系统支持的语言列表
    static language: any;
    //主语言
    static main_language: string;
    //语言包
    static config: any;

    static load() {
        const file_name = core.MD5.createInstance().hex_md5(`plat-${core.plat_id}-${core.lang}-1`);
        console.log(">>>>>>>core.plat_id: ", core.plat_id);
        console.log(">>>>>>>core.lang: ", core.lang);
        const url = `${core.cdnUrl}/resource/language_web/${file_name}.json?` + Math.random();
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
