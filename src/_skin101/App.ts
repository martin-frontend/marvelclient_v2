import AbstractView from "@/core/abstract/AbstractView";
import GameProxy from "@/proxy/GameProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import { Watch } from "vue-property-decorator";
import OpenLink from "@/core/global/OpenLink";
import HeaderProxy from "@/views/header/proxy/HeaderProxy";
import { isMobile, judgeClient } from "@/core/global/Functions";
import CopyUtil from "@/core/global/CopyUtil";
import GameConfig from "@/core/config/GameConfig";
import Utils from "@/core/global/Utils";
import { getVersion } from "@/core/global/Functions";

export default class APP extends AbstractView {
    gameProxy: GameProxy = getProxy(GameProxy);
    headerProxy: HeaderProxy = getProxy(HeaderProxy);
    LangUtil = LangUtil;
    isMobile = isMobile;
    getVersion = getVersion;
    getChannelID() {
        return core.channel_id;
    }
    //是否显示IOS引导
    guideDrawer = false;
    //是否竖屏
    isScreenV = true;

    qrCode_android = null;
    qrCode_ios = null;
    qrCode_app = null;

    public get androidUrl(): string {
        return GameConfig.config.android_download_link;
        // return GameConfig.config.AndroidApkUrl;
    }
    public get iosUrl(): string {
        return GameConfig.config.ios_download_link;
    }

    async setLink_android() {
        const imgBase64 = await Utils.generateQrcode(this.androidUrl);
        this.qrCode_android = imgBase64;
    }
    async setLink_ios() {
        const imgBase64 = await Utils.generateQrcode(this.iosUrl);
        this.qrCode_ios = imgBase64;
    }
    async setLink_app() {
        const imgBase64 = await Utils.generateQrcode(window.location.href.split("#/")[0] + "#/" + "page_qrcode");
        this.qrCode_app = imgBase64;
    }

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
            const data = { code: core.invite_user_id || core.user_id, pid: core.plat_id, channel: core.channel_id };
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
        const link = LangUtil("客服链接") + "?id=" + core.user_id;
        try {
            window.open(
                link,
                LangUtil("客服"),
                "height=680, width=680, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
            );
        } catch (e: any) {
            OpenLink(link);
        }
    }

    onTop() {
        window.scrollTo(0, 0);
    }
}
