import Vue from "vue";
import App from "./App.vue";
import { getVuetify } from "@/_skin003/plugins/vuetify";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/iconfont/iconfont.css";
import "@/_skin003/style/common.scss";
import AppFacade from "./AppFacade";
import VueLoadmore from "vuejs-loadmore";
import WebViewBridge from "@/core/native/WebViewBridge";
import LogUtil from "@/core/global/LogUtil";
import 'element-ui/lib/theme-chalk/index.css';
import Assets from "@/_skin003/assets/Assets";
import CustomTree from "@/_skin001/views/widget/custom_tree/CustomTree.vue";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
import "@/_skin003/assets/text/text.css";
LogUtil.init();
core.init();
//@ts-ignore
core.plat_id = core.channel_id = undefined;
core.game_domain = process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV != "h5" ? location.host : "all.starsabc.com";
AppFacade.inst.startup();

Vue.config.productionTip = false;
Vue.use(VueLoadmore);
Vue.component("custom-tree", CustomTree);
Vue.use(VueLoadmore);
Vue.use(Notifications, { velocity });

const vuetify = getVuetify();
Vue["vuetify"] = vuetify; 
Vue["router"] = router;
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
