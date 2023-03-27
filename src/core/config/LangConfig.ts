import axios from "axios";
import Vue from "vue";
import { getFileVersion } from "../global/Functions";
import NotificationName from "../NotificationName";

export default class LangConfig {
    //系统支持的语言列表
    static language: any;
    //主语言
    static main_language: string;
    //语言包
    static config: any;
    static lang_type = 1;
    static load() {
        const file_name = core.MD5.createInstance().hex_md5(`plat-${core.plat_id}-${core.lang}-${LangConfig.lang_type}`);
        const url = `${core.cdnUrl}/resource/language_web/${file_name}.json?` + getFileVersion();
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

    /**获取路由中的语言 */
    static getRouterLang() {
        if (core.lang == "zh_CN") {
            return "zh-CN";
        } else if (core.lang == "zh_TW") {
            return "zh-TW";
        } else {
            return core.lang.substring(0, 2);
        }
    }
    /**从URL中获取语言 */
    static getLangByRouter(path?: string) {
        let langStr = "";
        if (Vue.router.mode == "hash") {
            langStr = (path || location.hash).split("/").reverse()[0];
        } else {
            langStr = (path || location.pathname).split("/").reverse()[0];
        }
        for (const item of Object.keys(this.language)) {
            if ((item == "zh_CN" && langStr == "zh-CN") || (item == "zh_TW" && langStr == "zh-TW") || item.substring(0, 2) == langStr) {
                return item;
            }
        }
        return "";
    }
}
