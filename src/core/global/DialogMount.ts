import { vuetify } from "@/plugins/vuetify";
import Vue from "vue";

const map: any = [];

export default function (pageClass: any) {
    if (map.indexOf(pageClass) == -1) {
        map.push(pageClass);
        const dialog_container = document.getElementById("dialog_container");
        if (dialog_container) {
            dialog_container.innerHTML = "";
            const page: any = new (Vue.extend(pageClass))({ vuetify });
            dialog_container.appendChild(page.$mount().$el);
        }
    }
}
