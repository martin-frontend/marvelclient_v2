import Vue from "vue";
import App from "./App.vue";
import { vuetify } from "./plugins/vuetify";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/iconfont/iconfont.css";
import "@/style/common.scss";
import AppFacade from "./AppFacade";
import VueLoadmore from 'vuejs-loadmore';

core.init();
core.host = "http://api.starsabc.com/";
core.cdnUrl = "http://sftpuser.starsabc.com/";
core.plat_id = "30000";
core.channel_id = "30000001";
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
