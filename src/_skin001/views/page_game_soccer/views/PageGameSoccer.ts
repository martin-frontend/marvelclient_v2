import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageGameSoccerMediator from "../mediator/PageGameSoccerMediator";
import PageGameSoccerProxy from "../proxy/PageGameSoccerProxy";
import LangUtil from "@/core/global/LangUtil";
import { judgeClient } from "@/core/global/Functions";
import getProxy from "@/core/global/getProxy";
import ScrollUtil from "@/core/global/ScrollUtil";
import GameProxy from "@/proxy/GameProxy";
import router from "@/router";
import dialog_message from "@/views/dialog_message";
import dialog_message_box from "@/views/dialog_message_box";

@Component
export default class PageGameSoccer extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageGameSoccerProxy = this.getProxy(PageGameSoccerProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(PageGameSoccerMediator);
    }

    mounted() {
        if(!this.myProxy.pageData.isAction){
            this.$router.replace("/");
        }
        this.onWatchHeight();
    }

    @Watch("$vuetify.breakpoint.height")
    onWatchHeight() {
        if(this.$vuetify.breakpoint.mobile){
            const gameFrame: any = this.$refs.gameFrame;
            const bodyH = document.body.clientHeight;
            gameFrame.style.height = (bodyH-75) + "px";
        }
    }

    onFullScreen() {
        const gameFrame = document.getElementById("gameFrame");
        if (gameFrame) {
            gameFrame.requestFullscreen().catch(() => {
                dialog_message.warn("Fullscreen not supported");
            });
        }
    }

    onBack() {
        dialog_message_box.confirm({
            message: LangUtil("确定要退出游戏吗"),
            okFun: () => {
                this.$router.replace("/");
            },
        });
    }

    destroyed() {
        super.destroyed();
    }
}
