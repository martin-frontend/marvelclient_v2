import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class AudioNode extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: 0 }) data!: any;

    backgroundSrc = ""; //背景音乐的文件路径
    effectSrc = ""; //音效的文件路径

    setBackgroundSound(path: string, type: string) {
        // const audioSource = document.getElementById("source_background");
        // const audio = document.getElementById("audio_background");
        if (this.$refs.audio_background && this.$refs.source_background) {
            console.log("设置背景音乐");
            //@ts-ignore
            this.$refs.audio_background.pause();
            //@ts-ignore
            this.$refs.source_background.src = path;
            //@ts-ignore
            this.$refs.source_background.setAttribute("type", type);
            //@ts-ignore
            this.$refs.audio_background.load(); // 重新加载音频以应用更改
            //@ts-ignore
            this.$refs.audio_background.play();
        }
    }

    setEffectSound(path: string, type: string) {
        // const audioSource = document.getElementById("audio_effect");
        // const audio = document.getElementById("source_effect");
        if (this.$refs.audio_effect && this.$refs.source_effect) {
            //@ts-ignore
            this.$refs.audio_effect.pause();
            //@ts-ignore
            this.$refs.source_effect.src = path;
            //@ts-ignore
            this.$refs.source_effect.setAttribute("type", type);
            //@ts-ignore
            this.$refs.audio_effect.load(); // 重新加载音频以应用更改
            //@ts-ignore
            this.$refs.audio_effect.play();
        }
    }
}
