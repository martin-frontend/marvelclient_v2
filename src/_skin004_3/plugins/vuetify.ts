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
                        primary: "#ffffff", //used
                        secondary: "#e3bc80", //used
                        accent: "#1D2A43", //used
                        error: "#EF413A",
                        info: "#8e8f91", //used
                        success: "#4CAF50",
                        warning: "#85AFF9",
                        white: "#ffffff",

                        colorCoin: "#F3B952", //used
                        colorTitleBg: "#1b1c1c", //used
                        colorMobileTitleBg: "#1b1c1c", //used
                        colorInfo: "#8e8f91", //used
                        colorBlue: "#ffffff", //used
                        colorPanelBg: "#202121", //used
                        colorPanelBg2: "#282827", //used
                        colorPanelBg3: "#282827", //used
                        colorPanelBg4: "#1A273F", //used
                        colorPanelBg5: "#282827", //used
                        colorPanelBg6: "#282827", //used
                        colorPanelTitleBg: "#282827", //used
                        colorUserPanelBg: "#282827", //used
                        colorUserPanelBg1: "#121212", //used
                        colorBtnBg: "#feba00", //used
                        colorBtnBg1: "#feba00", //used
                        colorBtnBg2: "#feba00", //used
                        colorSelectBg: "#282827", //used
                        colorExtensionBtn: "#37619A", //used
                        colorExtensionBtn3: "#272727", //used
                        colorBonusBtn: "#6EAAFA", //used
                        colorReceive: "#5E2E2E", //used
                        colorBlue2Bg: "#202121", //used
                        colorYellowBg: "#F2A81C",
                        colorGoldBg: "#ffb01b",
                        colorBlueBtn: "3A66BA",

                        // //新增
                        colorBtnSeleBg: "#CD30C1", //used
                        colorActivityBg: "#12294a", //used
                        colorMobileMenuBg: "#202121", //used
                        colorMobileMenuText: "#8e8f91", //used
                        colorMobileMenuActiveText: "#feba00", //used
                        colorMobileHeaderBg: "#1b1c1c", //used
                        colorEmailIcon: "#ffffff", //used
                        colorSwitchBtn: "#3b3b3b", //used
                        bgBanner: "#282827",
                        colorActiveBtn: "#feba00",
                        colorInactiveBtn: "#2f3030",
                        colorInputPlaceholder: "#5f6368",
                        colorListSelectBg: "#2f3030",
                        colorListSelectBg1: "#1b1c1c",
                        colorListSelectBg2: "#2f3030",
                        colorPageMineCardBg: "#282727",
                        colorFooterBg: "#202121",
                        colorDialogRegisterBg: "#202121",

                        colorText1: "#8e8f91",
                        colorText2: "#ffffff",
                        colorText3: "#9BA1AB", //used
                        colorText4: "#ffffff", //used
                        colorText5: "#ffffff", //used
                        colorText6: "#ffffff", //used
                        colorText7: "#ffffff",
                        colorText8: "#68799A",
                        colorText9: "#60B7BF",
                        colorTextGold: "#F3B952",
                        colorTextBlue: "#31486C", //used
                        colorTextPurple: "#ffffff", //used
                        colorTextGreen: "#69B65E", //used
                        colorTextAll: "669CE7", //used
                        colorTextBlueLight: "#ffffff", //used
                        colorTextBlueLight2: "#ffffff", //used
                        colorTextBlueLight3: "#70A9FA", //used
                        colorBorderBlue: "#374F81", //used
                        colorDialogInfo: "#FFB01A",
                        colorPurpleBtn: "#4F5188", //used
                        colorHowBtn: "#3B4B68", //used
                        colorTextNext: "#3B5F96", //used
                        colorVipLevelText: "#8C9FC4",
                        colorMarqueeIcon: "#9FA3A9",

                        //001皮肤专用
                        colorTextBlue1: "#ffffff",
                        colorTextBlue2: "#feba00",
                        colorTextBlack: "#ffffff",
                        colorTextBlack1: "#ffffff",
                        colorTextOrange: "#FF7200",
                        colorTextYellow: "#FF9C00",
                        colorBackgroundGray: "#282727",
                        colorYellow: "#D7A80E",
                        colorGreen: "#25D810",
                        scoreColor: "#ff3e3e",
                        colorYellow1: "#EDBF00",
                        colorBlue1: "#ffffff",
                        colorYellow2: "#ECB60A",
                        colorRed2: "#D83710",
                        colorTextBlueLight4: "#7AB0FA",
                        colorExtensionBtn2: "#3e3f41",
                        color_tips_1: "#ffffff",
                        color_text_1: "#ffffff",
                        color_yellow_text_2: "#E2AB08",
                    },
                },
                dark: true,
            },
        };
        vuetify = new Vuetify(opts);
    }
    return vuetify;
}
