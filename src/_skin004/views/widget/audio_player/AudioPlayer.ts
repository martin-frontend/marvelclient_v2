import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";
import AudioPlayerProxy from "./AudioPlayerProxy";
import getProxy from "@/core/global/getProxy";

@Component
export default class Question extends AbstractView {
    LangUtil = LangUtil;
    backgroundAudioSource = "./music/backgroud.mp3";
    clickAudioSource = "./music/click.mp3";
    myProxy: AudioPlayerProxy = getProxy(AudioPlayerProxy);

    firstInteraction = true;

    mounted() {
        window.addEventListener("click", this.playAudio);
        window.addEventListener("blur", this.leavePage);
        window.addEventListener("focus", this.backToPage);
    }

    leavePage() {
        // console.warn("页面失去焦点时的处理逻辑");
        this.myProxy.isBackgroundPlaying = false;
    }

    backToPage() {
        // console.warn("用户返回当前页面时的处理逻辑");
        if (this.$route.name != "page_game_play" && this.$route.name != "page_game_soccer") {
            this.myProxy.isBackgroundPlaying = true;
        }
    }

    handleFirstInteraction() {
        this.playBackgroundAudioAudio();
    }

    playAudio() {
        if (this.firstInteraction) {
            this.handleFirstInteraction();
            this.firstInteraction = false;
            return;
        }
        //@ts-ignore
        this.$refs.clickAudio.play();
    }

    pauseBackgroundAudioAudio() {
        if (!this.$refs.backgroundAudio) return;
        //@ts-ignore
        this.$refs.backgroundAudio.pause();
    }

    playBackgroundAudioAudio() {
        if (!this.$refs.backgroundAudio) return;
        //@ts-ignore
        this.$refs.backgroundAudio.play();
    }

    @Watch("myProxy.isBackgroundOpen")
    onChangeMute(val: boolean) {
        //@ts-ignore
        this.$refs.backgroundAudio.muted = !val;
        //@ts-ignore
        this.$refs.clickAudio.muted = !val;
    }

    @Watch("myProxy.isBackgroundPlaying")
    onWatchPlaying(val: boolean) {
        if (val) {
            this.playBackgroundAudioAudio();
        } else {
            this.pauseBackgroundAudioAudio();
        }
    }
}
