import Vue from "vue";
import App from "@/_skin005/App.vue";
import { getVuetify } from "@/_skin020/plugins/vuetify";
import { getRouter, routes } from "@/_skin005/router";
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
import GameConfig from "@/core/config/GameConfig";
import { getVersion } from "@/core/global/Functions";
import { createSimpleTransition } from "vuetify/lib/components/transitions/createTransition";
import LangUtil from "@/core/global/LangUtil";
import SlideVerify from "@/_skin005/views/widget/slide_verify/SlideVerify.vue";
Assets.commonIcon.loading_img = "loding_icon_20.png?" + getVersion();
Assets.commonIcon.logo = require(`@/_skin020/assets/logo.png`);
Assets.commonIcon.logo_m = require(`@/_skin020/assets/logo_m.png`);
Assets.commonIcon.login_logo_m = require(`@/_skin020/assets/login_logo_m.png`);
SkinVariable.isLobbyGameTop = true;
//SkinVariable.isShowFootDetail = false;
SkinVariable.isNeedDownloadBtn = false;
SkinVariable.isFootballTop = false;
//SkinVariable.loadingType = "006";
// SkinVariable.isUsedDialogRecharge  = true;
// SkinVariable.isForeShowRecharge = true;

// document.body.style.setProperty("--yellow_color_1", "#D63333");
// document.body.style.setProperty("--yellow_color_2", "#BB1A1A");
// document.body.style.setProperty("--btn_nomal_text", "#fff");
// document.body.style.setProperty("--btn_disable_text_dark", "#BABABA");
SkinVariable.isShowPlatUsersVerification = true;
SkinVariable.autoTheme = false;
SkinVariable.systemKefuTop = false;

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
Vue.component("SlideVerify_1", SlideVerify);
Vue.component("goldinfo_util", GoldInfoUtil);
{
    const myTransition = createSimpleTransition("mobile-slide-x-transition");
    Vue.component("mobile-slide-x-transition", myTransition);
}
GlobalVar.skin = "skin020";

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

    const Whisper_client_id: string = "avuaz2GpcqzP4DL1YiSosg"; //这个跟 web得 不一样
    const Whisper_redirect_uri: string =
        process.env.NODE_ENV == "production"
            ? "https://bet2dream.com/redirect.html"
            : "https://all.testjj9.com/coinfans/skin020/redirect.html";

    // 检测是否再 whisper 钱包内打开应用 用这个来判断
    //@ts-ignore
    const whisper = window["Whisper"];
    if (whisper) {
        whisper.init({
            client_id: Whisper_client_id,
            redirect_uri: Whisper_redirect_uri,
        });
        const ret = whisper.isInitialized();
        if (ret) {
            if (core.token) {
                WhisperRequest();
            } else {
                PanelUtil.message_alert({
                    message: LangUtil("是否已经成年，内容只对成年人开放"),
                    okFun: () => {
                        WhisperRequest();
                    },
                });
            }
        } else {
            console.error("Whisper init faild." + ret);
            //core.notify2view("Whisper init faild." + ret);
        }
    } else {
        const timer = setInterval(() => {
            const code = window.localStorage.getItem("code");
            if (code) {
                onWhisperLogin(code);
                clearInterval(timer);
            }
        }, 2000);
    }

    function WhisperRequest() {
        whisper.request({
            event: "connect-wallet",
            data: { response_type: "code" },
            callback: WhisperCallback,
            onError: WhisperCallbackOnError,
        });
    }
    //
    function WhisperCallback(payload: any) {
        onWhisperLogin(payload["code"], 2);
    }
    //
    function WhisperCallbackOnError(err: any) {
        alert(JSON.stringify(err));
    }
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
//Vue.vuetify.framework.theme.dark = true;
SkinVariable.autoTheme = false;
PanelUtil.setThemeDark(true);

function onWhisperLogin(code: any, type: number = 1) {
    //PanelUtil.message_info("code:" + code);
    if (code) {
        window.localStorage.removeItem("code");
        puremvc.Facade.getInstance().sendNotification(net.HttpType.api_user_third_login, {
            plat_id: core.plat_id,
            channel_id: core.channel_id,
            code,
            type: type,
            invite_user_id: core.invite_user_id,
        });
    }
}
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
