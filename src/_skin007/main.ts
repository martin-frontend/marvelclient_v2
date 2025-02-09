import Vue from "vue";
import App from "@/_skin005/App.vue";
import { getVuetify } from "@/_skin005/plugins/vuetify";
import { getRouter, routes } from "@/_skin007/router";
import "@/_skin005/style/_vars.css";
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
import LoadMore1 from "@/views/widget/loadMore1/LoadMore1.vue";
import Footer from "@/_skin005/views/footer/Footer.vue";
import Header from "@/_skin005/views/header/Header.vue";
import GameConfig from "@/core/config/GameConfig";
import { getVersion } from "@/core/global/Functions";
import { createSimpleTransition } from "vuetify/lib/components/transitions/createTransition";
import SlideVerify from "@/_skin005/views/widget/slide_verify/SlideVerify.vue";
Assets.commonIcon.loading_img = "loding_icon_7.png?" + getVersion();
Assets.commonIcon.logo = require(`@/_skin007/assets/logo.png`);
Assets.commonIcon.logo_m = require(`@/_skin007/assets/logo_m.png`);
Assets.commonIcon.login_logo_m = require(`@/_skin007/assets/login_logo_m.png`);

SkinVariable.isShowGameListNovigation = false;
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
GlobalVar.skin = "skin007";

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

    //应seo需求，重写router.push router.replace, 直接跳转到相应页面
    //@ts-ignore
    (router.push1 = router.push), (router.replace1 = router.replace);
    //@ts-ignore
    router.push = router.replace = (path: any) => {
        //@ts-ignore  所有的独立页面
        const allRoutes = window.allRoutes;
        const lang = LangConfig.getRouterLang();
        const newPath = `${lang}${path}`;
        if (path == `/${lang}`) {
            location.replace(lang + location.search);
        } else if (allRoutes.includes("/" + newPath)) {
            if (!location.pathname.includes(newPath) || !location.pathname.includes(lang)) location.replace(newPath + location.search);
        } else {
            if (router.mode == "hash") {
                const baseUrl = process.env.VUE_APP_URL_BASE || "";
                location.replace(`${baseUrl}${location.search}#${newPath}`);
            } else {
                location.replace(newPath + location.search);
            }
        }
    };

    setTimeout(() => {
        const page = document.getElementById("app");
        if (page) {
            page.style.fontFamily = "'Roboto', 'sans-serif'";
        }
        const root: any = document.querySelector(".skin005 .font-weight-bold");
        if (root) root.style.setProperty("font-family", "Roboto");
    }, 1000);
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
PanelUtil.getThemeDark();
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
