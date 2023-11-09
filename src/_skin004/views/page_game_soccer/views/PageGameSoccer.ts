import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageGameSoccerMediator from "../mediator/PageGameSoccerMediator";
import PageGameSoccerProxy from "../proxy/PageGameSoccerProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";
import dialog_message_box from "@/views/dialog_message_box";
import ScrollUtil from "@/core/global/ScrollUtil";
import AudioPlayerProxy from "@/_skin004/views/widget/audio_player/AudioPlayerProxy";

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

    mounted() {
        if (!this.myProxy.pageData.isAction) {
            this.$router.replace("/");
        }

        this.timer = setInterval(() => {
            const gameFrame: HTMLElement = <any>this.$refs.gameFrame;
            if (gameFrame && this.$vuetify.breakpoint.mobile) {
                gameFrame.style.height = window.innerHeight - 55 + "px";
            }
        }, 100);
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
                this.$router.go(-1);
            },
        });
    }

    destroyed() {
        super.destroyed();
        clearInterval(this.timer);
        const audioProxy: AudioPlayerProxy = this.getProxy(AudioPlayerProxy);
        audioProxy.isBackgroundPlaying = true;
    }
}
