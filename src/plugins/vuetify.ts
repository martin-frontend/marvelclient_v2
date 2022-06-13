import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

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
                white: "#ffffff",

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
                colorExtensionBtn: "#37619A", //used
                colorBonusBtn: "#6EAAFA", //used
                colorReceive: "#5E2E2E", //used
                colorBlue2Bg: "#2C3952",
                colorYellowBg: "#F2A81C",

                colorText1: "#4c5d7f",
                colorText2: "#96AAD0",
                colorText3: "#9BA1AB", //used
                colorText4: "#85A7DC", //used
                colorText5: "#9AAED5", //used
                colorText6: "#9DB1D8", //used
                colorText7: "#5F80C1",
                colorTextGold: "#F3B952",
                colorTextBlue: "#31486C", //used
                colorTextPurple: "#A8A8F5", //used
                colorTextGreen: "#69B65E", //used
                colorTextBlueLight: "#72ABFD", //used
                colorTextBlueLight2: "#98ACD3", //used
                colorTextBlueLight3: "#70A9FA", //used
                colorBorderBlue: "#374F81", //used
                colorDialogInfo: "#FFB01A",
                colorPurpleBtn: "#4F5188", //used
                colorHowBtn: "#3B4B68", //used
                colorTextNext: "#3B5F96", //used
                colorVipLevelText: "#8C9FC4",
                colorMarquee: "#20304D",
            },
        },
        dark: true,
    },
};

const vuetify = new Vuetify(opts);

export { vuetify };
