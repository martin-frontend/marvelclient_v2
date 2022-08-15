import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/iconfont/iconfont.css";
import "@/_skin100/style/common.scss";
import AppFacade from "@/AppFacade";
import VueLoadmore from "vuejs-loadmore";
import { getVuetify } from "./plugins/vuetify";
import LogUtil from "@/core/global/LogUtil";
import { js_utils } from "custer-js-utils";

LogUtil.init();
core.init();
//@ts-ignore
core.plat_id = core.channel_id = undefined;
if (process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV != "h5") {
    core.cdnUrl = process.env.VUE_APP_URL;
} else {
    core.host = "http://api.starsabc.com/";
    core.cdnUrl = "http://sftpuser.starsabc.com";
    core.plat_id = js_utils.getQueryVariable("plat_id") || "30012";
    core.channel_id = js_utils.getQueryVariable("channel_id") || "30012001";
}
AppFacade.inst.startup();

Vue.config.productionTip = false;
Vue.use(VueLoadmore);

const vuetify =  getVuetify();
//@ts-ignore
window["vm"] = new Vue({
    router,
    vuetify,
    // i18n,
    render: (h) => h(App),
});
// .$mount("#app");

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
