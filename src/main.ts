import Vue from "vue";
import App from "./App.vue";
import { vuetify, i18n } from "./plugins/vuetify";
import router from "./router";
import "@/assets/iconfont/iconfont.css";
import "@/style/common.scss";
import AppFacade from "./AppFacade";

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    i18n,
    render: (h) => h(App),
}).$mount("#app");

core.init();
core.host = "http://api.starsabc.com/";
core.cdnUrl = "http://api.starsabc.com/";
core.plat_id = "30000";
core.channel_id = "30000001";
AppFacade.inst.startup();
