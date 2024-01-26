import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogActivityPointSpinProxy from "../../proxy/DialogActivityPointSpinProxy";
import { AnimDoScale, AnimRotation } from "@/_skin005/core/AnimationUtil";
import { changeDateShow } from "@/core/global/Functions";
import gsap, { Linear } from "gsap";
import ActivityConfig from "@/core/config/ActivityConfig";
@Component
export default class Score extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogActivityPointSpinProxy = this.getProxy(DialogActivityPointSpinProxy);
    pageData = this.myProxy.pageData;
    scoreData = this.pageData.scoreData;

    get bg_node_size() {
        const size_data_pc = {
            bonus_bg: {
                width: 95,
                height: 93,
            },
            bonus_light: {
                width: 60,
                height: 60,
            },
            bonus_award_item: {
                width: 32,
                height: 32,
            },
        };
        const size_data_mob = {
            bonus_bg: {
                width: 68,
                height: 87,
            },
            bonus_light: {
                width: 50,
                height: 50,
            },
            bonus_award_item: {
                width: 25,
                height: 25,
            },
        };
        return this.$vuetify.breakpoint.mobile ? size_data_mob : size_data_pc;
    }
    bgAnimTimeLine = <any>null;
    bgAnimation() {
        if (this.bgAnimTimeLine) {
            this.bgAnimTimeLine.restart();
        } else {
            const tl = gsap.timeline();
            // AnimRotation(this.$refs.anim_award_light, tl, 20, -360);

            //@ts-ignore
            const bonus_btn = this.$refs.bonus_btn.$el;
            if (bonus_btn) {
                AnimDoScale(bonus_btn, tl);
            }
            const ele = this.$refs.anim_award_type;
            if (ele) {
                tl.to(
                    ele,
                    {
                        duration: 1,
                        scale: 1.1,
                        yoyo: true,
                        repeat: -1,
                    },
                    "<"
                );
            }
            tl.play();
            this.bgAnimTimeLine = tl;
        }
    }

    mounted() {
        // this.$nextTick(() => {
        //     this.bgAnimation();
        // });
    }
    getDate(str: string, isChange: boolean = true) {
        return changeDateShow(str, isChange);
    }
    get endTime() {
        return LangUtil("活动剩余时间:") + ActivityConfig.spinLastTimeTxt;
        // const data = Timezone.Instance.convertTime_to_Locale_utc(this.pageData.data.last_end_time * 1000);
        // return this.getDate(data, false);
    }
    onBtnClickGetBonus() {
        console.warn("奖励按钮被点击");
        this.myProxy.api_plat_activity_ball_rewards_var_receive();
    }
    get bonusStateStr() {
        switch (this.pageData.data.award_status) {
            case 11:
                return LangUtil("未达成");
            case 12:
                return LangUtil("点击领取");
            case 21:
                return LangUtil("已领取");
            default:
                return "";
        }
    }
    get isCanGet() {
        return this.pageData.data.award_status == 12;
    }
    get progressText() {
        switch (this.pageData.data.award_status) {
            case 11:
                return LangUtil("还差{0}积分可以获得奖励，去推广使用抽奖券获得更多积分", this.scoreData.remaining);
            case 12:
            case 21:
                return LangUtil("已完成积分任务");
            default:
                return "";
        }
    }
    @Watch("pageData.data.award_status")
    onLotteryCallback() {
        if (this.isCanGet) {
            this.bgAnimation();
        } else {
            const ele = this.$refs.anim_award_type;
            if (ele) {
                gsap.to(ele, {
                    duration: 0,
                    scale: 1,
                });
            }
            if (this.bgAnimTimeLine) {
                this.bgAnimTimeLine.kill();
            }
        }
    }
}
