import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "vuetify/dist/vuetify.min.css";
import VueI18n from "vue-i18n";

// Vue.use(Vuetify);
Vue.use(VueI18n);

Vue.use(Vuetify, {
    breakpoint: {
        thresholds: {
            md: 1424,
            lg: 1424,
            xl: 1424,
        },
        scrollbarWidth: 10,
    },
});

/**简体中文 */
import zhHans from "vuetify/es5/locale/zh-Hans";
/**繁体中文 */
// import zhHant from "vuetify/es5/locale/zh-Hant";
/**英文 */
import en from "vuetify/es5/locale/en";
/**越南文 */
import vi from "vuetify/es5/locale/vi";

import zhLocal from "../lang/zhHans";
import viLocal from "../lang/vi";
import enLocal from "../lang/en";

// 创建 VueI18n 实例
const i18n = new VueI18n({
    locale: "zhHans",
    messages: {
        zhHans: {
            // ...zhHans,
            ...zhLocal,
        },
        en: {
            // ...en,
            ...enLocal,
        },
        vi: {
            // ...vi,
            ...viLocal,
        },
    },
});

const opts = {
    // lang: {
        // t: <any>((key: any, ...params: any[]) => i18n.t(key, params)),
    // },
    theme: {
        themes: {
            dark: {
                primary: "#FFAF1A", //used
                secondary: "#e3bc80", //used
                accent: "#1D2A43", //used
                error: "#EF413A",
                info: "#858ca6", //used
                success: "#4CAF50",
                warning: "#85AFF9",

                colorInfo: "#50607f", //used
                colorBlue: "#9db1d8", //used
                colorPanelBg: "#121E36", //used
                colorPanelTitleBg: "#25324B", //used
                colorBtnBg: "#6fa9fa", //used
            },
        },
        dark: true,
    },
};

const vuetify = new Vuetify(opts);

export { vuetify, i18n };
