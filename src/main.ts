import Vue from "vue";
import App from "./App.vue";
import { vuetify } from "./plugins/vuetify";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/iconfont/iconfont.css";
import "@/style/common.scss";
import AppFacade from "./AppFacade";
import VueLoadmore from "vuejs-loadmore";
import WebViewBridge from "@/core/native/WebViewBridge";


core.init();
//@ts-ignore
core.plat_id = core.channel_id = undefined;
if (process.env.VUE_APP_ENV == "production") {
    core.cdnUrl = "https://static.cf0x.com";
} else {
    core.host = "http://api.starsabc.com/";
    core.cdnUrl = "http://sftpuser.starsabc.com/";
    core.plat_id = "30000";
    core.channel_id = "30000001";
}
AppFacade.inst.startup();

Vue.config.productionTip = false;
Vue.use(VueLoadmore);

//@ts-ignore
window["vm"] = new Vue({
    router,
    vuetify,
    render: (h) => h(App),
});
// .$mount("#app");

//native调用
//@ts-ignore
window["receiveNative"] = WebViewBridge.getInstance().receiveNative;

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
