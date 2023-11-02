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
                    light: {
                        primary: "#0F1213",
                        lineColor: "#E8E8E2",
                        bgColor: "#f4f4f4",
                        bgNavigation: "#ffffff",
                        bgHeaderNavigation: "#ffffff",
                        bgHeaderBox: "#ffffff",
                        navIcon: "#5d5d5d",
                        navText: "#5d5d5d",
                        navTextHover: "#0F1213",
                        textYellow: "#FEBA00",
                        bgBanner: "#ffffff",
                        textGray: "#5A5A5A",
                        red: "#F64D55",
                        borderGameItem: "#C8CAD0",
                        bgButtonNav: "#FFCD43",
                        textGreen: "#41A81D",
                        borderColor: "#333435",
                        arrow_color: "#a4a4a4",
                        tips_color_bg: "#d6dde3",
                        tips_color_bg_2: "#f2f2f2",
                        tips_color: "#0F1213",
                        menu_color: "#ffffff",
                        nomal_text: "#5d5d5d",
                        disable_text: "#A4A4A4",
                        disable_text_2: "#5A5A5A",
                        nomal_text_1: "#5a5a5a",
                        nomal_icon: "#d6dde3",
                        wallet_bg: "#f4f4f4",
                        copy_icon: "#a4a4a4",
                        water_bg: "#f4f4f4",
                        head_color: "#fcfcfc",
                        head_btn: "#5A5A5A",
                        wallet_bg_2: "#fff",
                        userInfo_color: "#5d5d5d",
                        msgShowTxt_color: "#FFFFFF",
                        rechargeText: "#b0b0b0",
                        leftText: "#8f8f8f",
                        search_bg: "#fff",
                        daily_bg: "#fcb131",
                        daily_mini_title: "#a25800",
                        daily_award_text: "#a65f09",
                        daily_close_btn: "#fcb131",
                        nomal_text_2: "#5a5a5a",
                    },
                    dark: {
                        primary: "#FFFFFF",
                        lineColor: "#3E3F41",
                        bgColor: "#388465",
                        bgNavigation: "#0c312a",
                        bgHeaderNavigation: "#00251d",
                        bgHeaderBox: "#282827",
                        navIcon: "#AADDCB",
                        navText: "#fff",
                        navTextHover: "#0F1213",
                        textYellow: "#fff200",
                        bgBanner: "#174131",
                        textGray: "#aaddcb",
                        red: "#F64D55",
                        borderGameItem: "#5A5A5A",
                        bgButtonNav: "#1B1C1C",
                        textGreen: "#41A81D",
                        borderColor: "#333435",
                        arrow_color: "#777777",
                        tips_color_bg: "#fff",
                        tips_color_bg_2: "#fff",
                        tips_color: "#0F1213",
                        menu_color: "#1E1E1E",
                        nomal_text: "#5d5d5d",
                        disable_text: "#5A5A5A",
                        disable_text_2: "#a4a4a4",
                        nomal_text_1: "#5a5a5a",
                        nomal_icon: "#d6dde3",
                        wallet_bg: "#215844",
                        wallet_btn: "#3ac167",
                        copy_icon: "#5a5a5a",
                        water_bg: "#2F3030",
                        head_color: "#00251d",
                        head_btn: "#FFFFFF",
                        wallet_bg_2: "#2F3030",
                        userInfo_color: "#8E8F91",
                        msgShowTxt_color: "#1D1E1F",
                        rechargeText: "#7f7f80",
                        leftText: "#abacac",
                        search_bg: "#202121",
                        daily_bg: "#fcb131",
                        daily_mini_title: "#a25800",
                        daily_award_text: "#fff",
                        daily_close_btn: "#fff",
                        nomal_text_2: "#8d8e91",
                        item_bg_2: "#2d6f57",
                        dialog_bg: "#0c312a",
                        form_item_bg_1: "#2d6f57",
                        form_item_bg_2: "#215844",
                    },
                },
                // dark: true
            },
        };
        vuetify = new Vuetify(opts);
    }
    return vuetify;
}
