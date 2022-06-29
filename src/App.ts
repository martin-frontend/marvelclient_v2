import AbstractView from "./core/abstract/AbstractView";
import GameProxy from "./proxy/GameProxy";
import getProxy from "./core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import { Watch } from "vue-property-decorator";
import OpenLink from "./core/global/OpenLink";
import HeaderProxy from "./views/header/proxy/HeaderProxy";
import { isMobile, judgeClient } from "./core/global/Functions";
import CopyUtil from "./core/global/CopyUtil";
import GameConfig from "./core/config/GameConfig";

export default class APP extends AbstractView {
    gameProxy: GameProxy = getProxy(GameProxy);
    headerProxy: HeaderProxy = getProxy(HeaderProxy);
    LangUtil = LangUtil;
    isMobile = isMobile;
    //是否显示IOS引导
    guideDrawer = false;
    //是否竖屏
    isScreenV = true;

    mounted() {
        this.onWatchScreen();
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
            } else {
                document.documentElement.style.overflow = "scroll";
                //@ts-ignore
                document.body.scroll = "yes";
            }
        }
    }

    get guideText() {
        //@ts-ignore
        return LangUtil(window.navigator.standalone === undefined ? "下载APP" : "添加到桌面");
    }

    get isShowGuide() {
        //@ts-ignore
        if (core.app_type == core.EnumAppType.APP || window.navigator.standalone === true) {
            return false;
        }
        return true;
    }

    onGuide() {
        //@ts-ignore
        if (window.navigator.standalone === false) {
            this.guideDrawer = true;
        } else {
            //将参数复制到剪切板
            const data = { code: core.user_id, pid: core.plat_id, channel: core.channel_id };
            CopyUtil(JSON.stringify(data));
            //下载apk
            const src = GameConfig.config.AndroidApkUrl;
            const form = document.createElement("form");
            form.action = src;
            document.getElementsByTagName("body")[0].appendChild(form);
            form.submit();
        }
    }

    onService() {
        OpenLink(LangUtil("客服链接"));
    }
}
