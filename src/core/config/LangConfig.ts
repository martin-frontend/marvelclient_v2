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
        return axios
            .get(url)
            .then((response: any) => {
                this.config = response.data;
                puremvc.Facade.getInstance().sendNotification(NotificationName.LANG_CONFIG);
            })
            .catch(() => {
                alert("Failed to get language pack");
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
        const isProduction = process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV == "production";
        //@ts-ignore
        path = path || (isProduction && !window.navigator.standalone ? location.pathname : location.hash);
        //@ts-ignore
        if (window.path) {
            path = location.pathname;
        }

        let langStr = path.split("/")[1];
        for (const item of Object.keys(this.language)) {
            if ((item == "zh_CN" && langStr == "zh-CN") || (item == "zh_TW" && langStr == "zh-TW") || item.substring(0, 2) == langStr) {
                return item;
            }
        }
        langStr = path.split("/")[2];
        for (const item of Object.keys(this.language)) {
            if ((item == "zh_CN" && langStr == "zh-CN") || (item == "zh_TW" && langStr == "zh-TW") || item.substring(0, 2) == langStr) {
                return item;
            }
        }
        return "";
    }
}
