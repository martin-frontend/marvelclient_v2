import Vue from "vue";
import App from "./App.vue";
import { vuetify } from "./plugins/vuetify";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/iconfont/iconfont.css";
import "@/style/common.scss";
import AppFacade from "./AppFacade";
import FagProxy from "@/proxy/FagProxy";

core.init();
core.host = "http://api.starsabc.com/";
core.cdnUrl = "http://sftpuser.starsabc.com/";
core.plat_id = "30000";
core.channel_id = "30000001";
AppFacade.inst.startup();

Vue.config.productionTip = false;

//@ts-ignore
window["vm"] = new Vue({
    router,
    vuetify,
    // i18n,
    render: (h) => h(App),
});
// .$mount("#app");

const facade = puremvc.Facade.getInstance();
const fagProxy: FagProxy = <any>facade.retrieveProxy(FagProxy.NAME);
fagProxy.api_plat_fag_index();
window.onload = function () {
    document.addEventListener("touchstart", function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });

    document.addEventListener("gesturestart", function (event) {
        event.preventDefault();
    });
};
