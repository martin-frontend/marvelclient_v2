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
                    },
                    dark: {
                        primary: "#FFFFFF",
                    },
                },
                dark: false
            },
        };
        vuetify = new Vuetify(opts);
    }
    return vuetify;
}
