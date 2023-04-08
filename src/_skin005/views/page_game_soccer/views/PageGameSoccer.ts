import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageGameSoccerMediator from "../mediator/PageGameSoccerMediator";
import PageGameSoccerProxy from "../proxy/PageGameSoccerProxy";
import LangUtil from "@/core/global/LangUtil";

import ScrollUtil from "@/core/global/ScrollUtil";
import { EnumPostMessage } from "@/core/enum/EnumPostMessage";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GameProxy from "@/proxy/GameProxy";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class PageGameSoccer extends AbstractView {
    LangUtil = LangUtil;
    gameProxy = this.getProxy(GameProxy);
    myProxy: PageGameSoccerProxy = this.getProxy(PageGameSoccerProxy);
    pageData = this.myProxy.pageData;
    timer = 0;

    get gameFrameClass() {
        if (this.$mobile) {
            const curPath = this.$router.app.$route.path;
            if (curPath.includes("cricket")) {
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
        }
    }

    mounted() {
        // if (!this.myProxy.pageData.isAction) {
        //     this.$router.replace("/");
        // }

        this.timer = setInterval(() => {
            const gameFrame: HTMLElement = <any>this.$refs.gameFrame;
            if (gameFrame && this.$mobile) {
                const curPath = this.$router.app.$route.path;
                if (curPath.includes("cricket")) {
                    gameFrame.style.height = window.innerHeight - 105 + "px";
                } else {
                    gameFrame.style.height = window.innerHeight - 60 + "px";
                }

                //gameFrame.style.height = window.innerHeight - 60 + "px";
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
            const curPath = this.$router.app.$route.path;
            console.log("路由切换-222-----", curPath);
            if (curPath.includes("cricket")) {
                gameFrame.style.height = window.innerHeight - 105 + "px";
            } else {
                gameFrame.style.height = window.innerHeight - 60 + "px";
            }
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
        PanelUtil.message_confirm({
            message: LangUtil("确定要退出游戏吗"),
            okFun: () => {
                this.$router.replace("/");
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
