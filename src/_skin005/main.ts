import Vue from "vue";
import App from "./App.vue";
import { getVuetify } from "./plugins/vuetify";
import { getRouter } from "./router";
import "@/_skin005/style/common.scss";
import "@/assets/iconfont/iconfont.css";
import "@mdi/font/css/materialdesignicons.css";
import AppFacade from "./AppFacade";
import VueLoadmore from "vuejs-loadmore";
import WebViewBridge from "@/core/native/WebViewBridge";
import LogUtil from "@/core/global/LogUtil";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
import "./icons";
import "@/_skin005/assets/text/text.css";
import "element-ui/lib/theme-chalk/index.css";

//注册 自定义的 组件
import BtnYellow from "./views/widget/btn_yellow/BtnYellow.vue";
import BtnUtil from "./views/widget/btn_util/BtnUtil.vue";
import BtnInfo from "./views/widget/btn_info/BtnInfo.vue";
import Overlay from "@/_skin005/views/widget/overlay/Overlay.vue";
import LoadMore from "@/_skin005/views/widget/loadMore/LoadMore.vue";
import ListNodata from "@/_skin005/views/widget/list_nodata/ListNodata.vue";
import CustomTree from "@/_skin005/views/widget/custom_tree/CustomTree.vue";
import ComDialogTitle from "@/_skin005/views/widget/com_dialog_title/ComDialogTitle.vue";

import GoldInfoUtil from "@/_skin005/views/widget/gold_info_util/GoldInfoUtil.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangConfig from "@/core/config/LangConfig";
import SkinVariable from "@/_skin005/core/SkinVariable";
import PanelUtil from "./core/PanelUtil";
import PixelEvenManager from "./core/PixelEvenManager";

LogUtil.init();
core.init();
//@ts-ignore
core.plat_id = core.channel_id = undefined;
core.game_domain = process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV != "h5" ? location.host : "skin001.testjj9.com";
//core.game_domain =  "96in.com";

Vue.config.productionTip = false;
Vue.use(VueLoadmore);
Vue.use(VueLoadmore);
Vue.use(Notifications, { velocity });
SkinVariable.isNeedPush = true;
SkinVariable.isNeedKefu = true;
SkinVariable.useFlyerLog = true;
SkinVariable.useGTM = true;

LangConfig.lang_type = 18;
PixelEvenManager.Init("1167176630610478");
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
window.$mobile = Vue.prototype.$mobile = false;
window.$xsOnly = Vue.prototype.$xsOnly = false;

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
PanelUtil.getThemeDark();
