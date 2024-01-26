import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogActivityPointSpinProxy from "../../proxy/DialogActivityPointSpinProxy";
import gsap, { Linear } from "gsap";
@Component
export default class Award extends AbstractView {
    LangUtil = LangUtil;

    myProxy: DialogActivityPointSpinProxy = this.getProxy(DialogActivityPointSpinProxy);
    pageData = this.myProxy.pageData;
    spinWidth = 375;
    timeHandle = 0;
    onClose() {
        this.pageData.bShowAward = false;
        if (this.timeHandle) {
            clearTimeout(this.timeHandle);
            this.timeHandle = 0;
        }
        this.myProxy.regetData();
    }
    mounted() {
        this.$nextTick(() => {
            this.bgAnimation();
            this.anim_open();
        });
    }
    @Watch("pageData.bShowAward")
    onWatchShow() {
        if (this.pageData.bShowAward) {
            if (this.timeHandle) {
                clearTimeout(this.timeHandle);
            }
            this.timeHandle = setTimeout(() => {
                // this.onClose();
            }, 5 * 1000);

            this.$nextTick(() => {
                this.bgAnimation();
                this.anim_open();
            });
        } else {
            if (this.bgAnimTimeLine) {
                this.bgAnimTimeLine.kill();
            }
        }
    }
    onBtnGet() {
        console.warn("---点击领取----");
        // this.onClose();
        this.anim_close();
    }

    anim_open() {
        const tl = gsap.timeline();
        //@ts-ignore
        const ele = this.$refs.anim_main_card.$el;
        if (!ele) return tl;
        tl.to(ele, {
            duration: 0,
            scale: 0,
        });

        tl.to(ele, {
            duration: 0.3,
            scale: 1,
        });
        // tl.eventCallback("onComplete", () => {

        // });
        tl.play();
    }
    anim_close() {
        //@ts-ignore
        const ele = this.$refs.anim_main_card.$el;
        if (!ele) {
            this.onClose();
        }
        const tl = gsap.timeline();
        tl.to(ele, {
            duration: 0,
            scale: 1,
        });

        tl.to(ele, {
            duration: 0.3,
            scale: 0,
        });
        tl.eventCallback("onComplete", () => {
            this.onClose();
        });
        tl.play();
    }
    bgAnimTimeLine = <any>null;
    bgAnimation() {
        if (this.bgAnimTimeLine) {
            this.bgAnimTimeLine.restart();
        } else {
            const tl = gsap.timeline();
            // AnimRotation(this.$refs.anim_award_light, tl, 20, -360);
            const ele = this.$refs.anim_award_type;
            if (!ele) return tl;
            tl.to(ele, {
                duration: 1,
                scale: 1.1,
                yoyo: true,
                repeat: -1,
            });

            tl.play();
            this.bgAnimTimeLine = tl;
        }
    }
}
