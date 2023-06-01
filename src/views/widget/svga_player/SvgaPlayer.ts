import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";
import SVGA from "svgaplayerweb"; // https://github.com/svga/SVGAPlayer-Web/blob/master/README.zh.md
import { getVersion } from "@/core/global/Functions";

@Component
export default class SvgaPlayer extends AbstractView {
    @Prop() id!: any;
    @Prop() src!: any; // 资源路径
    @Prop() styleObj!: any;
    @Prop({ default: 0 }) loops!: any; // 动画循环次数，默认值为 0，表示无限循环
    @Prop() onFrame!: any; // 动画播放至某帧后回调
    @Prop() onFinished!: any; // 动画停止播放时回调
    @Prop({ default: "AspectFill" }) mode!: any; // 设置动画的拉伸模式，可选 "Fill" | "AspectFill" | "AspectFit"

    LangUtil = LangUtil;
    // player: any = null;

    mounted() {
        this.initMachineSVGA();
    }

    // @Watch("src")
    // onChangeSrc() {
    //     console.warn('clear');

    //     this.player.clear();
    //     this.initMachineSVGA();
    // }

    initMachineSVGA() {
        // console.warn('initMachineSVGA', this.src);

        const id = "#svga-player-" + this.id;
        const player = new SVGA.Player(id);
        // if (!this.player) {
        //     this.player = player;
        // }
        player.loops = this.loops;
        player.clearsAfterStop = false; // 默认值为 true，表示当动画结束时，清空画布。
        // @ts-ignore
        const parser = new SVGA.Parser(id);
        const newSrc = `${this.src}?${getVersion()}`;
        parser.load(
            newSrc,
            (videoItem) => {
                player.setVideoItem(videoItem);
                player.setContentMode(this.mode);
                player.startAnimation();
                player.onFinished(() => this.onFinished?.());
                player.onFrame((frame) => this.onFrame?.(frame));
            },
            (error: Error) => console.warn("svga-player 播放失败")
        );
    }
}
