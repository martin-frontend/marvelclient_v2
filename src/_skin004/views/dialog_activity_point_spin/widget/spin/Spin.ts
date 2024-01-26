import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogActivityPointSpinProxy from "../../proxy/DialogActivityPointSpinProxy";
import gsap, { Linear } from "gsap";
import { AnimRotation, AnimScaleAndFadeOut } from "@/_skin005/core/AnimationUtil";
@Component
export default class Spin extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogActivityPointSpinProxy = this.getProxy(DialogActivityPointSpinProxy);
    pageData = this.myProxy.pageData;
    spinItemData = this.pageData.data.point_lottery_award;

    spinWidth = 412;

    mounted() {
        this.$nextTick(() => {
            this.init();
        });
    }
    lastTimeLine = <any>null;
    init() {
        if (this.lastTimeLine) {
            this.lastTimeLine.kill();
        }
        const tl = gsap.timeline();
        this.resetSpinItemPosition(tl);
        this.stopAminSelectItem(tl);
        this.initSpinMainNode(tl);
        tl.play();
        this.bgAnimation();
    }
    /**设置转动对象位置 */
    resetSpinItemPosition(tl: gsap.core.Timeline) {
        if (!tl) {
            tl = gsap.timeline();
        }
        if (!this.$refs.spinItem) return tl;
        //@ts-ignore
        const divArr: any = Array.from(this.$refs.spinItem);
        divArr.sort((a: any, b: any) => {
            const da = a.$el.getAttribute("idx");
            const db = b.$el.getAttribute("idx");
            return parseInt(da) < parseInt(db) ? -1 : 1;
        });
        //半径
        const radius = 114;
        const itemCount = 12;
        const angleIncrement = (2 * Math.PI) / itemCount;
        const rota = 360 / itemCount;
        for (let index = 0; index < divArr.length; index++) {
            const element = divArr[index].$el;
            const angle = (index - 3) * angleIncrement;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            tl.to(
                element,
                {
                    duration: 0,
                    x: x,
                    y: y,
                    rotation: rota * index,
                },
                "<"
            );
        }
        return tl;
    }
    /**停止选择动画 */
    stopAminSelectItem(tl: gsap.core.Timeline) {
        if (!tl) {
            tl = gsap.timeline();
        }
        if (!this.$refs.select_div) return tl;
        tl.to(
            this.$refs.select_div,
            {
                duration: 0,
                opacity: 0,
            },
            "<"
        );
        // }
        return tl;
    }
    /**复原圆盘的位置 */
    initSpinMainNode(tl: gsap.core.Timeline) {
        if (!tl) {
            tl = gsap.timeline();
        }
        if (!this.$refs.spin_main_node) return tl;
        //@ts-ignore
        const spin_main_node = this.$refs.spin_main_node.$el;
        tl.to(spin_main_node, {
            duration: 0,
            rotation: 0,
            ease: Linear.easeNone,
        });
        return tl;
    }
    spinPointAnim(duration: number = 3) {
        const spin_point = this.$refs.spin_point;
        if (!spin_point) return;
        const tl = gsap.timeline();
        const time_start = duration / 3 / 2;
        const time_run = ((duration / 3) * 2) / 7;
        //还原位置
        tl.to(spin_point, {
            duration: 0,
            rotation: 0,
        });
        tl.to(spin_point, {
            duration: time_start,
            rotation: 5,
            ease: "power3.in",
        });
        tl.to(spin_point, {
            duration: time_run,
            rotation: 8,
            yoyo: true,
            repeat: 7,
        });
        tl.to(spin_point, {
            duration: time_start,
            rotation: 0,
            ease: "power3.out",
        });
        tl.play();
        return tl;
    }
    //转动的动画
    spinAnim() {
        if (this.lastTimeLine) {
            this.lastTimeLine.kill();
        }
        const tl = gsap.timeline();
        this.stopAminSelectItem(tl);

        const random = this.pageData.lottery_callback_info.award_index;
        //@ts-ignore
        const spin_main_node = this.$refs.spin_main_node.$el;
        const radius = 360 / 12;

        const totle_run_time = 3;
        tl.to(spin_main_node, {
            duration: totle_run_time,
            rotation: 360 * 10 - radius * random,
            ease: "power3.inOut",
        });
        const tl_point = this.spinPointAnim(totle_run_time);
        if (tl_point) {
            tl.add(tl_point, "<");
        }
        tl.to(spin_main_node, {
            duration: 0,
            rotation: -radius * random,
            ease: Linear.easeNone,
        });
        if (this.$refs.select_div) {
            tl.to(this.$refs.select_div, {
                duration: 0,
                rotation: radius * random,
                ease: Linear.easeNone,
            });
            tl.to(
                this.$refs.select_div,
                {
                    duration: 0.3,
                    repeat: 3,
                    yoyo: true,
                    opacity: 1,
                    ease: "power2.inOut",
                },
                "+=0.3"
            );
        }

        tl.eventCallback("onComplete", this.onSpinComplete.bind(this));
        tl.play();
        this.pageData.isSpinRun = true;
        this.lastTimeLine = tl;
    }
    onSpinComplete() {
        this.pageData.isSpinRun = false;
        console.log("----转动结束----");
        this.myProxy.pageData.bShowAward = true;
    }
    onSpinClick() {
        // this.pageData.playCount++;
        this.myProxy.api_plat_activity_every_point_lottery_var();
    }
    @Watch("pageData.isSpinRun")
    onWatchIsRun() {
        if (this.pageData.isSpinRun) {
            if (this.bgAnimTimeLine) {
                this.bgAnimTimeLine.kill();
            }
            this.initBgAnimation();
        } else {
            if (!this.bgAnimTimeLine) {
                this.bgAnimation();
            } else {
                this.bgAnimTimeLine.restart();
                console.warn("重新开始播放");
            }
        }
    }
    @Watch("pageData.playCount")
    onLotteryCallback() {
        console.log("----开始转动----");
        this.spinAnim();
    }
    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            this.$nextTick(() => {
                this.init();
            });
        }
    }
    bgAnimTimeLine = <any>null;
    bgAnimation() {
        if (this.isDisable) return;
        if (this.bgAnimTimeLine) {
            // this.bgAnimTimeLine.kill();
            this.bgAnimTimeLine.restart();
        } else {
            const tl = gsap.timeline();
            //@ts-ignore
            const tl_1 = AnimScaleAndFadeOut(this.$refs.anim_spin_btn_node.$el, null, 1.5, 2.2);
            //@ts-ignore
            const tl_2 = AnimScaleAndFadeOut(this.$refs.anim_spin_btn_node_2.$el, null, 1.5, 2.2);
            tl.add(tl_1, "<");
            tl.add(tl_2, "+0.4");

            tl.play();
            this.bgAnimTimeLine = tl;
        }
    }
    initBgAnimation() {
        const tl = gsap.timeline();
        //@ts-ignore
        const tl_1 = AnimScaleAndFadeOut(this.$refs.anim_spin_btn_node.$el, null, 0, 1, 0);
        //@ts-ignore
        const tl_2 = AnimScaleAndFadeOut(this.$refs.anim_spin_btn_node_2.$el, null, 0, 1, 0);
        tl.add(tl_1, "<");
        tl.add(tl_2, "<");

        tl.play();
    }
    get isDisable() {
        return this.pageData.isSpinRun || !this.pageData.isCanSpin;
    }
}
