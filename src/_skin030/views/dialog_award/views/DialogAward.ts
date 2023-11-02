import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PageBlur from "@/_skin030/core/PageBlur";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogAwardMediator from "../mediator/DialogAwardMediator";
import DialogAwardProxy from "../proxy/DialogAwardProxy";
import MultDialogManager from "@/_skin030/core/MultDialogManager";

@Component
export default class DialogAward extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogAwardProxy = this.getProxy(DialogAwardProxy);
    pageData = this.myProxy.pageData;

    plat_coins = GamePlatConfig.config.plat_coins;

    constructor() {
        super(DialogAwardMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    async onResetAnim() {
        this.isLoop = false;

        this.$nextTick(() => {
            const award = this.$refs.start_anim;
            if (award) {
                //@ts-ignore
                award.initMachineSVGA();
            }
            const award_loop = this.$refs.loop_anim;
            if (award_loop) {
                //@ts-ignore
                award_loop.initMachineSVGA();
            }
        });
    }
    @Watch("pageData.bHidden")
    onWatchHidden() {
        if (!this.pageData.bHidden) {
            // console.log("----hidden--");
            this.onResetAnim();
        }
    }
    @Watch("pageData.bShow")
    async onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            await this.onResetAnim();
        } else {
            const award = this.$refs.start_anim;
            if (award) {
                //@ts-ignore
                award.clear();
            }
            const award_loop = this.$refs.loop_anim;
            if (award_loop) {
                //@ts-ignore
                award_loop.clear();
            }
        }
    }

    isLoop = false;
    resolveSvgaSrc(name: any) {
        return "svga/" + name + ".svga";
    }

    onStartAnimFinish() {
        // console.log("--  开始播放 循环动画----");
        // this.$nextTick(()=>{
        this.isLoop = true;
        // });
    }
}
