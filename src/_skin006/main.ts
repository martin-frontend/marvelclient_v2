import Vue from "vue";
import App from "@/_skin005/App.vue";
import { getVuetify } from "@/_skin005/plugins/vuetify";
import { getRouter } from "@/_skin006/router";
import "@/_skin005/style/common.scss";
import AppFacade from "@/_skin005/AppFacade";
import VueLoadmore from "vuejs-loadmore";
import WebViewBridge from "@/core/native/WebViewBridge";
import LogUtil from "@/core/global/LogUtil";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
import "@/_skin005/icons";
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

Assets.commonIcon.loading_img = "loding_icon_6.png";
Assets.commonIcon.logo = require(`@/_skin006/assets/logo.png`);
Assets.commonIcon.logo_m = require(`@/_skin006/assets/logo_m.png`);

SkinVariable.isShowFootDetail = false;
SkinVariable.loadingType = "006";
SkinVariable.isUsedDialogRecharge = true;
SkinVariable.isForeShowRecharge = true;
SkinVariable.isCustomizeFooter = false;
SkinVariable.isShowMobileFooter = false;
SkinVariable.isShowVailBet = true;
LogUtil.init();
core.init();
//@ts-ignore
core.plat_id = core.channel_id = undefined;
core.game_domain = process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV != "h5" ? location.host : "skin001.testjj9.com";
//core.game_domain =  "betnow.co";
AppFacade.inst.startup();

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
Vue.component("ListNodata", ListNodata);
Vue.component("custom-tree", CustomTree);
Vue.component("com-dialog-title", ComDialogTitle);

Vue.component("goldinfo_util", GoldInfoUtil);

GlobalVar.skin = "skin005";

const vuetify = getVuetify();
Vue["vuetify"] = vuetify;
//@ts-ignore
window["vueInit"] = () => {
    const router = getRouter();
    Vue["router"] = router;
    //@ts-ignore
    window["vm"] = new Vue({
        router,
        vuetify,
        render: (h) => h(App),
    }).$mount("#app");
};

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
PanelUtil.getThemeDark();
