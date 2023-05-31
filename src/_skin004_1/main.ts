import Vue from "vue";
import App from "@/_skin004_1/App.vue";
import { getVuetify } from "@/_skin004/plugins/vuetify";
import router from "@/_skin004/router";
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/iconfont/iconfont.css";
import "@/style/common.scss";
import AppFacade from "@/_skin004/AppFacade";
import VueLoadmore from "vuejs-loadmore";
import WebViewBridge from "@/core/native/WebViewBridge";
import LogUtil from "@/core/global/LogUtil";
import "element-ui/lib/theme-chalk/index.css";
import Assets from "@/assets/Assets";
import CustomTree from "@/_skin001/views/widget/custom_tree/CustomTree.vue";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
import SkinVariable from "@/_skin004/core/SkinVariable";

LogUtil.init();
core.init();
//@ts-ignore
core.plat_id = core.channel_id = undefined;
core.game_domain = process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV != "h5" ? location.host : "skin001.testjj9.com";
if (process.env.VUE_APP_GAME_DOMAIN) {
    core.game_domain = process.env.VUE_APP_GAME_DOMAIN;
}

// if (process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV != "h5") {
//     core.cdnUrl = GameConfig.getCdnUrl();
// } else {
//     core.host = "http://api.testjj9.com/";
//     core.cdnUrl = "http://sftpuser.testjj9.com";
//     core.plat_id = js_utils.getQueryVariable("plat_id") || "30000";
//     core.channel_id = js_utils.getQueryVariable("channel_id") || "30000001";
// }
AppFacade.inst.startup();
Vue.use(VueLoadmore);
Vue.use(Notifications, { velocity });

SkinVariable.pageHead_logo = require(`@/_skin004_1/assets/logo.png`);
SkinVariable.pageHome_project_1 = require(`@/_skin004_1/assets/page_home/project_info_1.png`);
SkinVariable.pageHome_project_2 = require(`@/_skin004_1/assets/page_home/project_info_2.png`);
SkinVariable.isSavePhoto = true;
SkinVariable.savePhotoBg = require(`@/_skin004_1/assets/extension/poster.jpg`);
SkinVariable.defaultCode = "86";
SkinVariable.mustShowInvite = true;
//SkinVariable.isShowSoccerMatche = false ;

Vue.config.productionTip = false;
Vue.use(VueLoadmore);
Vue.component("custom-tree", CustomTree);

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

const commonIcon = Assets.commonIcon;
commonIcon.loading = require(`@/assets/loading001.gif`);

vuetify.framework.theme.themes.dark.colorDialogRegisterBg = "#121E36";
