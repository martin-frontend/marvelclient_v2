import Vue from "vue";
import Cookies from "js-cookie";
import VueI18n from "vue-i18n";

// User defined lang
import en_US from "./en_US";
import zh_CN from "./zh_CN";
import vi_VN from "./vi_VN";
import GlobalVar from "@/core/global/GlobalVar";

Vue.use(VueI18n);

const getLanguage = () => Cookies.get("language");

export const messages = {
    en_US: {
        ...en_US,
    },
    zh_CN: {
        ...zh_CN,
    },
    vi_VN: {
        ...vi_VN
    }
    // 这里如果有其它语言包继续按照规则添加即可
};

export const getLocale = () => {
    const language = getLanguage() || navigator.language.toLowerCase();

    Cookies.set("language", language);
    const locales = Object.keys(messages);
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            switch (locale) {
                case "zh_CN":
                    GlobalVar.lang = "zh_CN";
                    break;
                case "en_US":
                    GlobalVar.lang = "en_US";
                    break;
            }
            return locale;
        }
    }

    // Default language is chinese
    GlobalVar.lang = "zh_CN";
    return "zh_CN";
};
