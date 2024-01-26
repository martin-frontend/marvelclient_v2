import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogActivityPointSpinMediator from "../mediator/DialogActivityPointSpinMediator";
import DialogActivityPointSpinProxy from "../proxy/DialogActivityPointSpinProxy";
import LangUtil from "@/core/global/LangUtil";
import gsap, { Linear } from "gsap";
import { AnimRotation, AnimScaleAndFadeOut } from "@/_skin005/core/AnimationUtil";
import BlurUtil from "@/core/global/BlurUtil";
@Component
export default class DialogActivityPointSpin extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogActivityPointSpinProxy = this.getProxy(DialogActivityPointSpinProxy);
    pageData = this.myProxy.pageData;
    point_lottery_cons = this.pageData.data.point_lottery_cons; //抽奖消耗
    scoreData = this.pageData.scoreData;
    core = core;
    rankList = this.pageData.rankData;
    constructor() {
        super(DialogActivityPointSpinMediator);
    }
    mounted() {
        this.$nextTick(() => {
            // this.spinBgMoveAnim();
        });
    }
    onClose() {
        if (this.pageData.isSpinRun) return;
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        // PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.resetQuery();
            this.myProxy.getRankListData();
            this.$nextTick(() => {
                this.resetCardScale();
                this.bgAnimation();
                // this.resetRule();
            });
        }
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
        const bodyW = document.body.clientWidth;
        if (!this.$vuetify.breakpoint.mobile) {
            let scale = bodyW / 1120;
            scale = Math.min(scale, 1.2);
            if (this.$refs.card_node) {
                //@ts-ignore
                this.$refs.card_node.$el.style.zoom = scale;
            }
        } else {
            const bodyW = document.body.clientWidth;
            const bodyH = document.body.clientHeight;
            // console.warn("---bodyH>>as", bodyH);
            // let scale = (bodyH / 740) * 0.9;
            let scale = bodyW / 340;
            scale = Math.min(scale, 1);
            if (this.$refs.card_node) {
                //@ts-ignore
                this.$refs.card_node.$el.style.zoom = scale;
            }
        }
    }

    onPhoneClose() {
        this.onClose();
    }
    onPhoneCardClick() {
        console.log("截断点击");
    }

    get titleImg() {
        let lang = core.lang;

        const inc: any = ["zh_CN", "en_EN", "pt_PT", "vi_VN"];
        // const inc: any = ["zh_CN"];
        if (!inc.includes(lang)) {
            lang = "zh_CN";
        }
        return require(`@/_skin004/assets/activity_point_spin/title/${lang}.png`);
    }

    @Watch("core.user_id")
    onRefresh() {
        console.log("---->>>刷新----");
        if (!core.user_id) {
            this.onClose();
            return;
        } else {
            this.myProxy.regetData();
        }
        // this.myProxy.api_plat_activity_index_everyday();
    }
    onBtnClickGet() {
        console.warn("消耗按钮被点击");

        if (this.isDisable) return;
        if (this.pageData.bShowAward) return;
        if (this.pageData.bShowAward) {
            this.pageData.bShowAward = false;
            this.myProxy.regetData();
            return;
        }
        this.myProxy.api_plat_activity_every_point_lottery_var();
    }

    bgAnimTimeLine = <any>null;
    bgAnimation() {
        if (this.bgAnimTimeLine) {
            this.bgAnimTimeLine.restart();
        } else {
            const tl = gsap.timeline();
            AnimRotation(this.$refs.anim_spin_bg_node, tl);
            AnimScaleAndFadeOut(this.$refs.anim_title_node, tl);
            AnimRotation(this.$refs.anim_bonus_light_node, tl, 20, -360);
            tl.play();
            this.bgAnimTimeLine = tl;
        }
    }
    get isDisable() {
        return this.pageData.isSpinRun || !this.pageData.isCanSpin;
    }
}
