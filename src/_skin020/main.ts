import Vue from "vue";
import App from "@/_skin005/App.vue";
import { getVuetify } from "@/_skin020/plugins/vuetify";
import { getRouter } from "@/_skin005/router";
import "@/_skin020/style/_vars.css";
import "@/_skin005/style/common.scss";
import "@/_skin020/style/skin020.css";
import AppFacade from "@/_skin005/AppFacade";
import VueLoadmore from "vuejs-loadmore";
import WebViewBridge from "@/core/native/WebViewBridge";
import LogUtil from "@/core/global/LogUtil";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
import "./icons";
import "@/_skin005/assets/text/text.css";
import "@/assets/iconfont/iconfont.css";
import "@mdi/font/css/materialdesignicons.css";
import "element-ui/lib/theme-chalk/index.css";

//注册 自定义的 组件
import BtnUtil from "@/_skin005/views/widget/btn_util/BtnUtil.vue";
import BtnInfo from "@/_skin005/views/widget/btn_info/BtnInfo.vue";
import Overlay from "@/_skin005/views/widget/overlay/Overlay.vue";
import LoadMore from "@/_skin005/views/widget/loadMore/LoadMore.vue";
import ListNodata from "@/_skin005/views/widget/list_nodata/ListNodata.vue";
import CustomTree from "@/_skin005/views/widget/custom_tree/CustomTree.vue";
import ComDialogTitle from "@/_skin005/views/widget/com_dialog_title/ComDialogTitle.vue";

import GoldInfoUtil from "@/_skin005/views/widget/gold_info_util/GoldInfoUtil.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangConfig from "@/core/config/LangConfig";

import Assets from "@/_skin005/assets/Assets";
import SkinVariable from "@/_skin005/core/SkinVariable";
import PanelUtil from "@/_skin005/core/PanelUtil";
import LoadMore1 from "@/views/widget/loadMore1/LoadMore1.vue";
import Footer from "@/_skin005/views/footer/Footer.vue";
import Header from "@/_skin020/views/header/Header.vue";

Assets.commonIcon.loading_img = "loding_icon_20.png";
Assets.commonIcon.logo = require(`@/_skin020/assets/logo.png`);
Assets.commonIcon.logo_m = require(`@/_skin020/assets/logo_m.png`);

//SkinVariable.isShowFootDetail = false;
//SkinVariable.loadingType = "006";
// SkinVariable.isUsedDialogRecharge  = true;
// SkinVariable.isForeShowRecharge = true;

// document.body.style.setProperty("--yellow_color_1", "#D63333");
// document.body.style.setProperty("--yellow_color_2", "#BB1A1A");
// document.body.style.setProperty("--btn_nomal_text", "#fff");
// document.body.style.setProperty("--btn_disable_text_dark", "#BABABA");

LogUtil.init();
core.init();
//@ts-ignore
core.plat_id = core.channel_id = undefined;
core.game_domain = process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV != "h5" ? location.host : "skin001.testjj9.com";
//core.game_domain =  "betnow.co";
if (process.env.VUE_APP_GAME_DOMAIN) {
    core.game_domain = process.env.VUE_APP_GAME_DOMAIN;
}

Vue.config.productionTip = false;
Vue.use(VueLoadmore);
Vue.use(VueLoadmore);
Vue.use(Notifications, { velocity });

LangConfig.lang_type = 18;
// 注册到全局
// Vue.component("btn-yellow", BtnYellow);
// Vue.component("btn-util", BtnUtil);
Vue.component("btn-yellow", BtnUtil);
Vue.component("btn-info", BtnInfo);
Vue.component("Overlay", Overlay);
Vue.component("LoadMore", LoadMore);
Vue.component("LoadMore1", LoadMore1);
Vue.component("ListNodata", ListNodata);
Vue.component("custom-tree", CustomTree);
Vue.component("com-dialog-title", ComDialogTitle);
Vue.component("Footer", Footer);
Vue.component("Header", Header);

Vue.component("goldinfo_util", GoldInfoUtil);

GlobalVar.skin = "skin020";

const vuetify = getVuetify();
Vue.vuetify = vuetify;
//@ts-ignore
window["vueInit"] = () => {
    const router = getRouter();
    Vue.router = router;
    //@ts-ignore
    window["vm"] = new Vue({
        router,
        vuetify,
        render: (h) => h(App),
    }).$mount("#app");
};

AppFacade.inst.startup();

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
//只要黑夜主题
Vue.vuetify.framework.theme.dark = true;
//获取钱包回调返回的code
const timer = setInterval(() => {
    const code = window.localStorage.getItem("code");
    if (code) {
        window.localStorage.removeItem("code");
        puremvc.Facade.getInstance().sendNotification(net.HttpType.api_user_third_login, {
            plat_id: core.plat_id,
            channel_id: core.channel_id,
            code,
        });
    }
}, 2000);
