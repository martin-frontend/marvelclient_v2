import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "vuetify/dist/vuetify.min.css";

let vuetify: Vuetify;

export function getVuetify(): Vuetify {
    if (!vuetify) {
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
                        colorPanelBg4: "#1A273F", //used
                        colorPanelBg5: "#24314A", //used
                        colorPanelTitleBg: "#25324B", //used
                        colorBtnBg: "#6fa9fa", //used
                        colorSelectBg: "#2C3D5C", //used
                        colorExtensionBtn: "#37619A", //used
                        colorBonusBtn: "#6EAAFA", //used
                        colorReceive: "#5E2E2E", //used
                        colorBlue2Bg: "#2C3952",
                        colorYellowBg: "#F2A81C",
                        colorGoldBg: "#ffb01b",
                        colorBlueBtn: "3A66BA",

                        // //新增
                        colorBtnSeleBg: "#CD30C1", //used

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

                        //001皮肤专用
                        colorTextBlue1: "#849FD8",
                        colorTextBlue2: "#03259C",
                        colorTextBlack: "#302f2f",
                        colorTextBlack1: "#3b3b3b",
                        colorTextOrange: "#FF7200",
                        colorTextYellow: "#FF9C00",
                        colorBackgroundGray: "#F1F1F1",
                        colorYellow: "#D7A80E",
                        colorGreen: "#25D810",
                        scoreColor: "#ff3e3e",
                        colorYellow1: "#EDBF00",
                        colorBlue1:"#7A95CA",
                        colorYellow2:"#ECB60A",
                        colorRed2:"#D83710",
                        colorTextBlueLight4:"#7AB0FA",
                        colorExtensionBtn2:"#4A5A77",
                        color_tips_1:"#97ABD1",
                        color_text_1:"#6A7B9D",
                        color_yellow_text_2:"#E2AB08",
                    },
                },
                dark: true,
            },
        };
        vuetify = new Vuetify(opts);
    }
    return vuetify;
}
