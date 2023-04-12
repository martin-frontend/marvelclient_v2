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
                        textGreen:"#41A81D",
                        borderColor:"#333435",
                        arrow_color:"#a4a4a4",
                        tips_color_bg:"#d6dde3",
                        tips_color_bg_2:"#f2f2f2",
                        tips_color:"#0F1213",
                        menu_color:"#ffffff",
                        nomal_text:"#5d5d5d",
                        disable_text:"#A4A4A4",
                        disable_text_2:"#5A5A5A",
                        nomal_text_1:"#5a5a5a",
                        nomal_icon:"#d6dde3",
                        wallet_bg:"#f4f4f4",
                        copy_icon:"#a4a4a4",
                        water_bg:"#f4f4f4",
                        head_color:"#fcfcfc",
                        head_btn:"#5A5A5A",
                        wallet_bg_2:"#fff",
                        userInfo_color:"#5d5d5d",
                        msgShowTxt_color:"#FFFFFF",
                        rechargeText:"#b0b0b0",
                        leftText:"#8f8f8f",
                    },
                    dark: {
                        primary: "#FFFFFF",
                        lineColor: "#3E3F41",
                        bgColor: "#202121",
                        bgNavigation: "#1B1C1C",
                        bgHeaderBox: "#282827",
                        navIcon: "#5A5A5A",
                        navText: "#5A5A5A",
                        navTextHover: "#0F1213",
                        textYellow: "#FEBA00",
                        bgBanner: "#272828",
                        textGray: "#8E8F91",
                        red: "#F64D55",
                        borderGameItem: "#5A5A5A",
                        bgButtonNav: "#1B1C1C",
                        textGreen:"#41A81D",
                        borderColor:"#333435",
                        arrow_color:"#323232",
                        tips_color_bg:"#fff",
                        tips_color_bg_2:"#fff",
                        tips_color:"#0F1213",
                        menu_color:"#1E1E1E",
                        nomal_text:"#5d5d5d",
                        disable_text:"#5A5A5A",
                        disable_text_2:"#a4a4a4",
                        nomal_text_1:"#5a5a5a",
                        nomal_icon:"#d6dde3",
                        wallet_bg:"#2F3030",
                        copy_icon:"#5a5a5a",
                        water_bg:"#2F3030",
                        head_color:"#1b1c1c",
                        head_btn:"#FFFFFF",
                        wallet_bg_2:"#2F3030",
                        userInfo_color:"#8E8F91",
                        msgShowTxt_color:"#1D1E1F",
                        rechargeText:"#7f7f80",
                        leftText:"#abacac",
                    },
                },
                // dark: true
            },
        };
        vuetify = new Vuetify(opts);
    }
    return vuetify;
}
