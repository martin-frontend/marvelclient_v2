import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogAwardBallMediator from "../mediator/DialogAwardBallMediator";
import DialogAwardBallProxy from "../proxy/DialogAwardBallProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PageBlur from "@/_skin005/core/PageBlur";
@Component
export default class DialogAwardBall extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogAwardBallProxy = this.getProxy(DialogAwardBallProxy);
    pageData = this.myProxy.pageData;
    awardData = this.myProxy.pageData.data;
    constructor() {
        super(DialogAwardBallMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
        if (this.myProxy.pageData.onCloseFun) {
            this.myProxy.pageData.onCloseFun();
        }
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.$nextTick(() => {
                const mainNode = document.getElementById("main_node");
                if (mainNode) {
                    //console.log("回到顶部");
                    mainNode.scrollTop = 0;
                }
                this.resetCardScale();
                // this.resetRule();
            });
            // this.clearTime();
            // this.isLastItem = false;
        }
        // else {
        //     this.clearTime();
        // }
    }
    @Watch("pageData.bHidden")
    onWatchHidden() {
        if (!this.pageData.bHidden) {
            this.$nextTick(() => {
                this.resetCardScale();
            });
        }
    }
    @Watch("$vuetify.breakpoint.width")
    onWatchScreen() {
        this.resetCardScale();
    }
    @Watch("$vuetify.breakpoint.height")
    onWatchScreen_height() {
        this.resetCardScale();
    }
    resetCardScale() {
        if (this.$refs.card_node) {
            let scale_height = this.$vuetify.breakpoint.height / 814;
            let scale_width = this.$vuetify.breakpoint.width / 600;
            scale_height = scale_height < 1 ? scale_height : 1;
            scale_width = scale_width < 1 ? scale_width : 1;
            if (!this.$xsOnly) {
                //判断是横屏还是竖屏
                const isHorizontal = scale_height < scale_width;
                if (isHorizontal) {
                    //@ts-ignore
                    this.$refs.card_node.$el.style.scale = scale_height;
                    //两个点 （0.52， -186） 和 （1，0）
                    const top_count = 387.5 * scale_height - 387.5;
                    //@ts-ignore
                    this.$refs.card_node.$el.style.top = top_count + "px";
                } else {
                    //@ts-ignore
                    this.$refs.card_node.$el.style.scale = scale_width;
                    //@ts-ignore
                    this.$refs.card_node.$el.style.top = "auto";
                }
            } else {
                scale_height = this.$vuetify.breakpoint.height / 814;
                scale_width = this.$vuetify.breakpoint.width / 660;
                scale_height = scale_height < 1 ? scale_height : 1;
                scale_width = scale_width < 1 ? scale_width : 1;

                const scale = scale_height > scale_width ? scale_width : scale_height;
                const height = 814;
                const width = 600;
                const top_count = height * (1 - scale) * 0.5;
                const left_count = width * (1 - scale) * 0.5;
                console.log("手机版----", scale);
                //@ts-ignore
                this.$refs.card_node.$el.style.top = -top_count + "px";
                //@ts-ignore
                // this.$refs.card_node.$el.style.left = -left_count + "px";
                // //@ts-ignore
                // this.$refs.card_node.$el.style.marginBottom = -top_count * 2 + "px";
                //@ts-ignore
                this.$refs.card_node.$el.style.scale = scale;
            }
        }
    }

    onPhoneClose() {
        this.onClose();
    }
    onPhoneCardClick() {
        console.log("截断点击");
    }

    get title_text() {
        return LangUtil("恭喜获得<br/>");
    }

    public get award_coin(): string {
        // if (!this.awardData || !this.awardData.award) return "";
        console.error("---->>>", this.myProxy.pageData.data.award);
        const keys = Object.keys(this.myProxy.pageData.data.award);
        let str = "";
        for (let index = 0; index < keys.length; index++) {
            if (index != 0) {
                str = str + "  ";
            }
            str = str + this.myProxy.pageData.data.award[keys[index]] + " " + keys[index];
        }
        return str;
    }
    resolveSvgaSrc(name: any) {
        return "svga/" + name + ".svga";
    }
    onGetBtnClick() {
        this.onClose();
    }
    test() {
        console.error("----shuju ----", this.myProxy.pageData.data.award);
    }
}
