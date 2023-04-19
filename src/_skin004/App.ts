import AbstractView from "@/core/abstract/AbstractView";
import GameProxy from "@/proxy/GameProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import { Watch } from "vue-property-decorator";
import OpenLink from "@/core/global/OpenLink";
import HeaderProxy from "@/_skin004/views/header/proxy/HeaderProxy";
import { isMobile, judgeClient } from "@/core/global/Functions";
import CopyUtil from "@/core/global/CopyUtil";
import GameConfig from "@/core/config/GameConfig";
import dialog_notice from "./views/dialog_notice";
import WebViewBridge from "@/core/native/WebViewBridge";
import ServiceUtil from "./core/global/ServiceUtil";
import AppProxy from "./AppProxy";

export default class APP extends AbstractView {
    gameProxy: GameProxy = getProxy(GameProxy);
    headerProxy: HeaderProxy = getProxy(HeaderProxy);

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
}
