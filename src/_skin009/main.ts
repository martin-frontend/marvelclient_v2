import Vue from "vue";
import App from "@/_skin005/App.vue";
import { getVuetify } from "@/_skin005/plugins/vuetify";
import { getRouter, routes } from "@/_skin005/router";
import "@/_skin005/style/_vars.css";
import "@/_skin005/style/common.scss";
import AppFacade from "@/_skin005/AppFacade";
import VueLoadmore from "vuejs-loadmore";
import WebViewBridge from "@/core/native/WebViewBridge";
import LogUtil from "@/core/global/LogUtil";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
import "@/_skin005/icons";
import "@/_skin009/assets/text/text.css";
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
import Header from "@/_skin005/views/header/Header.vue";
import GameConfig from "@/core/config/GameConfig";
import { getVersion } from "@/core/global/Functions";
import { createSimpleTransition } from "vuetify/lib/components/transitions/createTransition";
import SlideVerify from "@/_skin005/views/widget/slide_verify/SlideVerify.vue";
Assets.commonIcon.loading_img = "loding_icon_9.png?" + getVersion();
Assets.commonIcon.logo = require(`@/_skin009/assets/logo.png`);
Assets.commonIcon.logo_m = require(`@/_skin009/assets/logo_m.png`);

//SkinVariable.isShowFootDetail = false;
//SkinVariable.loadingType = "006";
// SkinVariable.isUsedDialogRecharge  = true;
// SkinVariable.isForeShowRecharge = true;
SkinVariable.isShowGameListNovigation = false;
SkinVariable.isFootballTop = false;
GlobalVar.game_address_method = 1;
LogUtil.init();
core.init();
//@ts-ignore
core.plat_id = core.channel_id = undefined;
core.game_domain = process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV != "h5" ? location.host : "skin001.testjj9.com";
//core.game_domain =  "96tr.com";
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
Vue.component("SlideVerify_1", SlideVerify);
Vue.component("goldinfo_util", GoldInfoUtil);
{
    const myTransition = createSimpleTransition("mobile-slide-x-transition");
    Vue.component("mobile-slide-x-transition", myTransition);
}
GlobalVar.skin = "skin009";

const vuetify = getVuetify();
Vue.vuetify = vuetify;
//@ts-ignore
window["vueInit"] = () => {
    addRouter();
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
// PanelUtil.getThemeDark();
PanelUtil.setThemeDark(true);
function addRouter() {
    if (!GameConfig.config.head_game_config) {
        GameConfig.config.head_game_config = <any>[];
    }
    const pageConfig = GameConfig.config.head_game_config;
    if (!pageConfig || pageConfig.length < 1) {
        return;
    }
    console.log("动态添加  路由进去 ");
    for (let index = 0; index < pageConfig.length; index++) {
        const element = pageConfig[index];
        if (!element.router_name || !element.router_name.trim()) continue;

        //查找 该 对象路由是否已经添加，
        const isHave = routes.some((ele: any, index: any, arr: any) => {
            return ele.path == "/" + element.router_name;
        });
        if (!isHave) {
            const obj = {
                path: "/" + element.router_name,
                name: "PageGameSoccer_" + element.router_name,
                component: () =>
                    import(/* webpackChunkName: "skin005_page_game_soccer" */ "@/_skin005/views/page_game_soccer/views/PageGameSoccer.vue"),
            };
            routes.push(obj);
        }
    }
}
