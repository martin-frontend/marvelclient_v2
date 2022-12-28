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
                    light: {},
                    dark: {
                        primary: "#4c5d7f", //used
                        secondary: "#e3bc80", //used
                        accent: "#1D2A43", //used
                        error: "#EF413A",
                        info: "#C1C1C1", //used
                        success: "#4CAF50",
                        warning: "#85AFF9",
                        white: "#ffffff",

                        colorCoin: "#F3B952", //used
                        colorTitleBg: "#111010", //used
                        colorInfo: "#fff", //used
                        colorBlue: "#fff", //used
                        colorPanelBg: "#18191C", //used
                        colorPanelBg2: "#16233F", //used
                        colorPanelBg3: "#12294A", //used
                        colorPanelBg4: "#1A273F", //used
                        colorPanelBg5: "#24314A", //used
                        colorPanelTitleBg: "#272424", //used
                        colorBtnBg: "#BA1B1A", //used
                        colorSelectBg: "#2C3D5C", //used
                        colorExtensionBtn: "#37619A", //used
                        colorBonusBtn: "#6EAAFA", //used
                        colorReceive: "#5E2E2E", //used
                        colorBlue2Bg: "#2C3952",
                        colorYellowBg: "#F2A81C",
                        colorGoldBg: "#ffb01b",
                        colorBlueBtn: "#3A66BA",

                        // //新增
                        colorBtnSeleBg: "#CD30C1", //used

                        colorText1: "#bebebe",
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

                        color_red_1:"#BA1B1A",
                        color_red_2:"#D02728",
                        color_black_1:"#1D1E1E",
                        color_black_2:"#101010",
                        color_text_white:"#E4E8EC",
                        color_marquee_1:"#262A30",
                        color_bg_black_1:"#18191C",
                        color_select_item_1:"#DE1213",
                        color_exit_text_1:"#BEBEBE",
                        color_bg_title_1:"#26272D",

                        color_btn_disabled_1:"#737373",
                        color_btn_disabled_text_1:"#C7C7C7",
                        color_btn_bg_2:"#979797",

                        color_progress_1:"#D6A158",
                        color_progress_text_1:"#FFA600",
                        color_blue_text_1:"#0057FF",
                        color_green_text_1:"#02C330",

                        color_btn_2:"#6C6161",
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
