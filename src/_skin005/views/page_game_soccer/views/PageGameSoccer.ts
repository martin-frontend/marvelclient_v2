import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageGameSoccerMediator from "../mediator/PageGameSoccerMediator";
import PageGameSoccerProxy from "../proxy/PageGameSoccerProxy";
import LangUtil from "@/core/global/LangUtil";

import ScrollUtil from "@/core/global/ScrollUtil";
import { EnumPostMessage } from "@/core/enum/EnumPostMessage";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class PageGameSoccer extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageGameSoccerProxy = this.getProxy(PageGameSoccerProxy);
    pageData = this.myProxy.pageData;
    timer = 0;

    get gameFrameClass() {
        if (this.$vuetify.breakpoint.mobile) {
            return "frame-mobile";
        } else {
            return "frame";
        }
    }

    constructor() {
        super(PageGameSoccerMediator);
    }

    @Watch("$vuetify.theme.dark")
    onWatchDark(){
        const ifr:any = document.getElementById('gameFrame')
        if(ifr && ifr.contentWindow){
            if(this.$vuetify.theme.dark){
                ifr.contentWindow.postMessage(EnumPostMessage.DARK, "*");
            }else{
                ifr.contentWindow.postMessage(EnumPostMessage.LIGHT, "*");
            }
        }
    }

    mounted() {
        if (!this.myProxy.pageData.isAction) {
            this.$router.replace("/");
        }

        this.timer = setInterval(() => {
            const gameFrame: HTMLElement = <any>this.$refs.gameFrame;
            if (gameFrame && this.$vuetify.breakpoint.mobile) {
                gameFrame.style.height = window.innerHeight - 60 + "px";
            }
        }, 100);
        PanelUtil.showAppLoading(false);
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
        super.destroyed();
        clearInterval(this.timer);
    }
}
