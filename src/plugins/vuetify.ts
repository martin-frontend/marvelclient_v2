import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "vuetify/dist/vuetify.min.css";
import VueI18n from "vue-i18n";
import { getLocale, messages } from "@/lang";

Vue.use(Vuetify);
Vue.use(VueI18n);

const locale = getLocale();

const i18n = new VueI18n({
    locale: locale,
    messages,
});

const opts = {
    theme: {
        themes: {
            dark: {
                primary: "#4c5d7f", //used
                secondary: "#e3bc80", //used
                accent: "#1D2A43", //used
                error: "#EF413A",
                info: "#858ca6", //used
                success: "#4CAF50",
                warning: "#85AFF9",

                colorCoin: "#F3B952", //used
                colorTitleBg: "#1d2a43", //used
                colorInfo: "#50607f", //used
                colorBlue: "#9db1d8", //used
                colorPanelBg: "#121E36", //used
                colorPanelBg2: "#16233F", //used
                colorPanelBg3: "#12294A", //used
                colorPanelTitleBg: "#25324B", //used
                colorBtnBg: "#6fa9fa", //used
                colorSelectBg: "#2C3D5C", //used
                colorExtensionBtn: "#3D5081", //used
                colorReceive: "#5E2E2E", //used

                colorText1: "#4c5d7f",
                colorText2: "#96AAD0",
                colorText3: "#9BA1AB", //used
                colorText4: "#85A7DC", //used
                colorTextGold: "#F3B952",
                colorDialogInfo: "#FFB01A",
            },
        },
        dark: true,
    },
};

const vuetify = new Vuetify(opts);

export { vuetify, i18n };
