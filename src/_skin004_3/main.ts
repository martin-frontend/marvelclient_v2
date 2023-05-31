import Vue from "vue";
import App from "@/_skin004_1/App.vue";
import { getVuetify } from "@/_skin004/plugins/vuetify";
import router from "@/_skin004_3/router";
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/iconfont/iconfont.css";
import "@/style/common.scss";
import "@/_skin004_3/style/skin004_3.scss";
import "@/_skin004_3/style/_vars.css";
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

SkinVariable.pageHead_logo = require(`@/_skin004_3/assets/logo.png`);
SkinVariable.pageHead_logo_mob = require(`@/_skin004_3/assets/logo.png`);
SkinVariable.pageHome_project_1 = require(`@/_skin004_3/assets/page_home/project_info_1.png`);
SkinVariable.pageHome_project_2 = require(`@/_skin004_3/assets/page_home/project_info_2.png`);
SkinVariable.isSavePhoto = true;
SkinVariable.savePhotoBg = require(`@/_skin004_3/assets/extension/poster.jpg`);
SkinVariable.defaultCode = "86";
SkinVariable.mustShowInvite = true;
SkinVariable.isShowSoccerMatche = false;
SkinVariable.icon_home = require(`@/_skin004_3/assets/icon/icon_home.png`);
SkinVariable.icon_home1 = require(`@/_skin004_3/assets/icon/icon_home1.png`);
SkinVariable.icon_play = require(`@/_skin004_3/assets/icon/icon_play.png`);
SkinVariable.icon_play1 = require(`@/_skin004_3/assets/icon/icon_play1.png`);
SkinVariable.icon_extension = require(`@/_skin004_3/assets/icon/icon_extension.png`);
SkinVariable.icon_extension1 = require(`@/_skin004_3/assets/icon/icon_extension1.png`);

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
commonIcon.loading = require(`@/_skin004_3/assets/loading001.gif`);
commonIcon.nodata = require(`@/_skin004_3/assets/nodata.png`);

// skin004_3 調整h5颜色
if (vuetify.framework.breakpoint.xsOnly) {
    vuetify.framework.theme.themes.dark.colorPanelTitleBg = "#282827";
    vuetify.framework.theme.themes.dark.colorUserPanelBg = "#282827";
    vuetify.framework.theme.themes.dark.colorUserPanelBg1 = "#121212";
    vuetify.framework.theme.themes.dark.colorInfo = "#8e8f91";
    vuetify.framework.theme.themes.dark.colorBlue = "#ffffff";
    vuetify.framework.theme.themes.dark.colorPanelBg = "#202121";
    vuetify.framework.theme.themes.dark.colorPanelBg2 = "#282827";
    vuetify.framework.theme.themes.dark.colorPanelBg3 = "#282827";
    vuetify.framework.theme.themes.dark.colorPanelBg4 = "#1A273F";
    vuetify.framework.theme.themes.dark.colorBtnBg = "#feba00";
    vuetify.framework.theme.themes.dark.colorBtnBg1 = "#feba00";
    vuetify.framework.theme.themes.dark.colorBtnBg2 = "#feba00";
    vuetify.framework.theme.themes.dark.colorBlue2Bg = "#202121";
    vuetify.framework.theme.themes.dark.colorEmailIcon = "#ffffff";
    vuetify.framework.theme.themes.dark.colorSwitchBtn = "#3b3b3b";
    vuetify.framework.theme.themes.dark.colorActivityBg = "#12294a";
    vuetify.framework.theme.themes.dark.colorMobileMenuBg = "#202121";
    vuetify.framework.theme.themes.dark.colorMobileMenuText = "#8e8f91";
    vuetify.framework.theme.themes.dark.colorMobileMenuActiveText = "#feba00";
    vuetify.framework.theme.themes.dark.colorMobileHeaderBg = "#1b1c1c";
    vuetify.framework.theme.themes.dark.colorEmailIcon = "#ffffff";
    vuetify.framework.theme.themes.dark.colorSwitchBtn = "#3b3b3b";
    vuetify.framework.theme.themes.dark.colorText1 = "#8e8f91";
    vuetify.framework.theme.themes.dark.colorText2 = "#ffffff";
    vuetify.framework.theme.themes.dark.colorText4 = "#ffffff";
    vuetify.framework.theme.themes.dark.colorText6 = "#ffffff";
    vuetify.framework.theme.themes.dark.colorActiveBtn = "#feba00";
    vuetify.framework.theme.themes.dark.colorInactiveBtn = "#2f3030";
    vuetify.framework.theme.themes.dark.colorInputPlaceholder = "#5f6368";
    vuetify.framework.theme.themes.dark.colorTextBlack1 = "#ffffff";
    vuetify.framework.theme.themes.dark.colorTextBlack = "#ffffff";
    vuetify.framework.theme.themes.dark.colorTextBlue2 = "#feba00";
    vuetify.framework.theme.themes.dark.color_text_1 = "#ffffff";
    vuetify.framework.theme.themes.dark.colorListSelectBg = "#2f3030";
    vuetify.framework.theme.themes.dark.colorListSelectBg1 = "#1b1c1c";
    vuetify.framework.theme.themes.dark.colorBackgroundGray = "#282727";
    vuetify.framework.theme.themes.dark.colorTextBlueLight2 = "#ffffff";
    vuetify.framework.theme.themes.dark.colorExtensionBtn = "#3e3f41";
    vuetify.framework.theme.themes.dark.colorPageMineCardBg = "#282727";
    vuetify.framework.theme.themes.dark.colorDialogRegisterBg = "#202121";
}
