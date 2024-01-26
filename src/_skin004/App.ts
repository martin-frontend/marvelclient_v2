import AbstractView from "@/core/abstract/AbstractView";
import GameProxy from "@/proxy/GameProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import OpenLink from "@/core/global/OpenLink";
import HeaderProxy from "@/_skin004/views/header/proxy/HeaderProxy";
import { isMobile, judgeClient } from "@/core/global/Functions";
import CopyUtil from "@/core/global/CopyUtil";
import GameConfig from "@/core/config/GameConfig";
import dialog_notice from "./views/dialog_notice";
import WebViewBridge from "@/core/native/WebViewBridge";
import ServiceUtil from "./core/global/ServiceUtil";
import AppProxy from "./AppProxy";
import { track_error_event } from "@/core/config/ErrorEvent";
import SkinVariable from "@/_skin004/core/SkinVariable";
import ActivityConfig from "@/core/config/ActivityConfig";
import dialog_activity_point_spin from "./views/dialog_activity_point_spin";
import dialog_message from "@/views/dialog_message";
@Component
export default class APP extends AbstractView {
    SkinVariable = SkinVariable;
    gameProxy: GameProxy = getProxy(GameProxy);
    headerProxy: HeaderProxy = getProxy(HeaderProxy);
    ActivityConfig = ActivityConfig;
    activity_config = this.ActivityConfig.config;
    myProxy: AppProxy = this.getProxy(AppProxy);

    LangUtil = LangUtil;
    isMobile = isMobile;

    //是否竖屏
    isScreenV = true;

    core = core;

    mounted() {
        this.onWatchScreen();
    }

    get guideImg() {
        return this.core.lang.includes("zh") ? require("@/assets/guide/img03.png") : require("@/assets/guide/img04.png");
    }
    /**发送 错误  */
    errorCaptured(error: any, vm: any, info: any) {
        const errorData = {
            error: error.message,
            component: vm.$options.name,
            stack: error.stack,
            info: info,
        };
        track_error_event(errorData, "Vue_error");
        //return false; // 阻止错误继续向上冒泡
    }

    @Watch("$vuetify.breakpoint.width")
    onWatchScreen() {
        this.$nextTick(() => {
            if (judgeClient() == "iOS") {
                this.isScreenV = this.$vuetify.breakpoint.width < this.$vuetify.breakpoint.height;
            } else {
                this.isScreenV = !window.orientation || window.orientation == 180 || window.orientation == 0;
            }
        });
    }

    @Watch("headerProxy.pageData.bShowUserPanel")
    onWatchUserPanelShow() {
        if (isMobile()) {
            if (this.headerProxy.pageData.bShowUserPanel) {
                document.documentElement.style.overflow = "hidden";
                //@ts-ignore
                document.body.scroll = "no";
                // if (judgeClient() == "iOS" && vuetify.framework.breakpoint.xsOnly) {
                //     document.documentElement.style.position = "fixed";
                // }
            } else {
                document.documentElement.style.overflow = "scroll";
                //@ts-ignore
                document.body.scroll = "yes";
                // if (judgeClient() == "iOS" && vuetify.framework.breakpoint.xsOnly) {
                //     document.documentElement.style.position = "relative";
                // }
            }
        }
    }

    get isShowHeader() {
        if (this.$vuetify.breakpoint.mobile) {
            if (this.$route.path == "/page_game_soccer" || this.$route.path == "/page_game_play") {
                return false;
            }
            return true;
        } else if (!this.$vuetify.breakpoint.mobile) {
            return true;
        }
    }

    get isShowGuide() {
        return this.myProxy.isShowGuide;
    }

    onGuide() {
        this.myProxy.onGuide();
    }

    onService() {
        ServiceUtil();
    }
    /**公告 */
    onNoticeShow() {
        dialog_notice.show();
    }
    onClickBtnPointSpin() {
        const activity_id = this.ActivityConfig.config.every_point.activity_id_arr[0];
        if (!activity_id) {
            dialog_message.info("活动id为空");
            return;
        }
        dialog_activity_point_spin.show(activity_id);
    }
    get showPointSpin() {
        return this.activity_config.every_point.is_open;
    }
    get spinTxt() {
        return this.ActivityConfig.spinLastTimeTxt;
    }
}
