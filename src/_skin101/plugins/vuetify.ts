import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "vuetify/dist/vuetify.min.css";

let vuetify: Vuetify;

export function getVuetify(): Vuetify {
    if (!vuetify) {
        Vue.use(Vuetify);
        const opts = {
            breakpoint: {
                thresholds: {
                    xs: 1200,
                    sm: 1200,
                    md: 1200,
                    mobile: 1200,
                    lg: 1280,
                },
            },
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
                        colorPanelBg4: "#1A273F", //used
                        // colorPanelBg4: "#596278", //used
                        colorPanelBg5: "#24314A", //used
                        colorPanelTitleBg: "#25324B", //used
                        // colorBtnBg: "#6fa9fa", //used
                        colorBtnBg: "#7ca7f4", //used
                        colorSelectBg: "#2C3D5C", //used
                        colorExtensionBtn: "#37619A", //used
                        colorBonusBtn: "#6EAAFA", //used
                        colorReceive: "#5E2E2E", //used
                        colorBlue2Bg: "#2C3952",
                        colorYellowBg: "#F2A81C",
                        colorGoldBg: "#ffb01b",
                        colorBlueBtn: "#3A66BA",

                        // //新增
                        // colorBtnSeleBg: "#CD30C1", //used
                        colorBtnSeleBg: "#7ca7f4", //used
                        colorText1: "#4c5d7f",
                        colorText2: "#96AAD0",
                        colorText3: "#9BA1AB", //used
                        colorText4: "#85A7DC", //used
                        colorText5: "#9AAED5", //used
                        colorText6: "#9DB1D8", //used
                        colorText7: "#5F80C1",
                        colorText8: "#68799A",
                        colorText9: "#60B7BF",
                        colorTextGold: "#F3B952",
                        colorTextBlue: "#31486C", //used
                        colorTextPurple: "#A8A8F5", //used
                        colorTextGreen: "#69B65E", //used
                        colorTextAll: "669CE7", //used
                        colorTextBlueLight: "#72ABFD", //used
                        colorTextBlueLight2: "#98ACD3", //used
                        colorTextBlueLight3: "#70A9FA", //used
                        colorBorderBlue: "#374F81", //used
                        colorDialogInfo: "#FFB01A",
                        colorPurpleBtn: "#4F5188", //used
                        colorHowBtn: "#3B4B68", //used
                        colorTextNext: "#3B5F96", //used
                        colorVipLevelText: "#8C9FC4",
                        colorMarqueeIcon: "#667798",
                        //101皮肤
                        colorTextYellow: "#F8D129", //used
                        colorTextNormal2: "#354052", //used
                        // colorTextNormal3: "#9086af",
                        colorBtnSeleBg101: "#7ca7f4", //used
                        colorBtnSeleBgVerity101: "#ffcc68", //used
                        colorBtnAll: "#d85b01", //used
                        colorBtnBg101: "#7ca7f4", //used
                        colorSelectPanelBg: "#252e43", //used
                        colorYellowBg2: "#f8d129",
                        info2: "#95989f", //used
                        colorTextGold101: "#ffcc68",
                        colorTextFoot101: "#95989f",
                        colorTextCommon101: "#0e1a31",
                        icon101: "#5d6a89",
                        colorIconArrow: "#5b6478",
                        colorTextNoData: "#8b909e",
                        colorProfit: "#00bca2",
                        colorLoss: "#f04a5a",
                        // colorFilter101: "#a1b0d5",
                        colorFilter101: "#4e5b7a",
                        colorCloseBtn: "#4e5b7a",
                        colorBindSuccess: "#8b929f",
                        //001皮肤专用
                        colorTextBlue001: "#849FD8",
                        colorPcTextBlue001: "#849FD8",
                    },
                },
                dark: true,
            },
        };
        vuetify = new Vuetify(opts);
    }
    return vuetify;
}
