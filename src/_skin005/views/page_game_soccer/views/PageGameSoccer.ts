import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageGameSoccerMediator from "../mediator/PageGameSoccerMediator";
import PageGameSoccerProxy from "../proxy/PageGameSoccerProxy";
import LangUtil from "@/core/global/LangUtil";

import { EnumPostMessage } from "@/core/enum/EnumPostMessage";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GameProxy from "@/proxy/GameProxy";
import GameConfig from "@/core/config/GameConfig";
import LangConfig from "@/core/config/LangConfig";

@Component
export default class PageGameSoccer extends AbstractView {
    LangUtil = LangUtil;
    gameProxy = this.getProxy(GameProxy);
    myProxy: PageGameSoccerProxy = this.getProxy(PageGameSoccerProxy);
    pageData = this.myProxy.pageData;
    timer = 0;

    get isHaveBanner() {
        const isCricket = this.$router.app.$route.path.includes("cricket");
        const list = isCricket ? PanelUtil.getProxy_noticeProxy.data.listType17 : PanelUtil.getProxy_noticeProxy.data.listType16;
        const isHave = list && list.length > 0;
        if (!isHave) return 0;
        return isCricket ? 217 : 216;
    }

    get isCricket() {
        const curPath = this.$router.app.$route.path;
        if (!this.myProxy.pageData.other_data) {
            return curPath.includes("cricket") || curPath.includes("orbit_exchange");
        } else {
            return (
                curPath.includes("cricket") ||
                curPath.includes("orbit_exchange") ||
                (this.myProxy.pageData.other_data && this.myProxy.pageData.other_data.is_show_head === 1)
            );
            // return this.myProxy.pageData.other_data ;
        }
    }
    public get sheetClass(): string {
        if (!this.$mobile) return "";
        return this.isCricket ? "ad_class_cricket" : "ad_class";
    }

    get gameFrameClass() {
        if (this.$mobile) {
            if (this.isHaveBanner && this.$vuetify.breakpoint.xsOnly) {
                if (this.isCricket) {
                    return "frame-mobile_cricket_banner";
                } else {
                    return "frame-mobile_banner";
                }
            }

            if (this.isCricket) {
                return "frame-mobile_cricket";
            } else {
                return "frame-mobile";
            }

            return "frame-mobile";
        } else {
            return "frame";
        }
    }

    constructor() {
        super(PageGameSoccerMediator);
    }

    @Watch("$vuetify.theme.dark")
    onWatchDark() {
        const ifr: any = document.getElementById("gameFrame");
        if (ifr && ifr.contentWindow) {
            const { vendor_id } = this.gameProxy.currGame;
            const { SportVendorId, CricketVendorId } = GameConfig.config;

            if (this.$vuetify.theme.dark) {
                //easybet
                if (vendor_id == SportVendorId) ifr.contentWindow.postMessage(EnumPostMessage.DARK, "*");
                //cricket
                if (vendor_id == CricketVendorId) ifr.contentWindow.postMessage({ action: "style", params: { theme: "gold" } }, "*");
            } else {
                //easybet
                if (vendor_id == SportVendorId) ifr.contentWindow.postMessage(EnumPostMessage.LIGHT, "*");
                //cricket
                if (vendor_id == CricketVendorId) ifr.contentWindow.postMessage({ action: "style", params: { theme: "orange" } }, "*");
            }
        }
    }

    @Watch("pageData.token")
    onWatchToken() {
        const ifr: any = document.getElementById("gameFrame");
        if (ifr) {
            ifr.contentWindow.postMessage({ action: "sportbookLogin", params: this.pageData.token }, "*");
            ifr.src = this.pageData.url;
            console.warn("刷新");
        }
    }

    mounted() {
        // if (!this.myProxy.pageData.isAction) {
        //     this.$router.replace("/");
        // }

        this.timer = setInterval(() => {
            const gameFrame: HTMLElement = <any>this.$refs.gameFrame;
            if (gameFrame && this.$mobile) {
                let height = 60;
                if (this.isCricket) {
                    height = this.isHaveBanner ? 220 : 105;
                } else {
                    height = this.isHaveBanner ? 175 : 60;
                }

                gameFrame.style.height = window.innerHeight - height + "px";
            }
        }, 100);
        PanelUtil.showAppLoading(false);

        this.$nextTick(() => {
            // 侦听iframe中页面加载完成
            const ifr: any = document.getElementById("gameFrame");
            if (ifr) ifr.onload = this.onWatchDark.bind(this);
        });
    }

    @Watch("$route")
    onWatchRouter() {
        console.log("路由切换-0-----");
        const gameFrame: HTMLElement = <any>this.$refs.gameFrame;
        if (gameFrame && this.$mobile) {
            let height = 60;
            if (this.isCricket) {
                height = this.isHaveBanner ? 220 : 105;
                // gameFrame.style.height = window.innerHeight - 105 + "px";
            } else {
                height = this.isHaveBanner ? 175 : 60;
                // gameFrame.style.height = window.innerHeight - 60 + "px";
            }
            gameFrame.style.height = window.innerHeight - height + "px";
        }
    }
    onFullScreen() {
        const gameFrame = document.getElementById("gameFrame");
        if (gameFrame) {
            gameFrame.requestFullscreen().catch(() => {
                PanelUtil.message_warn(LangUtil("Fullscreen not supported"));
            });
        }
    }

    onBack() {
        const homePage = GameConfig.config.homePage ?? "";
        PanelUtil.message_confirm({
            message: LangUtil("确定要退出游戏吗"),
            okFun: () => {
                this.$router.replace(`/${LangConfig.getRouterLang()}/${homePage}`);
            },
        });
    }

    destroyed() {
        clearInterval(this.timer);
        const ifr: any = document.getElementById("gameFrame");
        if (ifr) ifr.onload = null;
        super.destroyed();
    }
}
