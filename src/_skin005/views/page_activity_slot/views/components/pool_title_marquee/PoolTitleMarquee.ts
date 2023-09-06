import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PageActivitySlotProxy from "../../../proxy/PageActivitySlotProxy";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";

@Component
export default class PoolTitleMarquee extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageActivitySlotProxy = this.getProxy(PageActivitySlotProxy);
    pageData = this.myProxy.pageData;
    ball_award_detail = this.myProxy.pageData.ball_award_detail;

    // poolstrarr = [9, 5, 6, 7, 0, 1, 5, 3, 9];
    marqueeTimeHandle = 0; //计时参数
    marqueeCount = 0;
    mounted() {
        this.$nextTick(() => {
            this.startMarqueeRun();
            this.resetCardScale();
        });
    }
    /**跑马灯时间 */
    startMarqueeRun() {
        if (this.marqueeTimeHandle) {
            clearInterval(this.marqueeTimeHandle);
        }
        const pool_title_marquee: HTMLElement = <any>this.$refs.pool_title_marquee;
        if (pool_title_marquee) {
            this.marqueeTimeHandle = setInterval(() => {
                this.marqueeCount++;
                if (this.marqueeCount % 2 == 0) {
                    pool_title_marquee.classList.remove("marquee_1");
                    pool_title_marquee.classList.add("marquee_2");
                } else {
                    pool_title_marquee.classList.remove("marquee_2");
                    pool_title_marquee.classList.add("marquee_1");
                }
            }, 500);
        }
    }

    public get poolstrarr() {
        let prize_pool_amount = this.ball_award_detail && this.ball_award_detail.prize_pool_amount;
        prize_pool_amount = prize_pool_amount || 0;
        const scale = CoinTransformHelper.GetMainCoinScale;
        const str = CoinTransformHelper.TransformMoney(
            prize_pool_amount,
            2,
            CoinTransformHelper.platCoins.mainCoin.name,
            this.ball_award_detail.coin_unique,
            false,
            true,
            false,
            false
        );
        const arr = (str + "").split("");
        // const arr = ["R", "$", "3", "4", "5", "6", "7", "8", "9"];
        const arr_length = arr.length;

        // R$ 符號移至最前面
        switch (arr_length) {
            case 6:
                for (let i = 0; i < 3; i++) {
                    arr.splice(2, 0, "0");
                }
                break;
            case 7:
                for (let i = 0; i < 2; i++) {
                    arr.splice(2, 0, "0");
                }
                break;
            case 8:
                for (let i = 0; i < 1; i++) {
                    arr.splice(2, 0, "0");
                }
                break;
            default:
                break;
        }

        // const neetItem = 9 - arr.length;
        // for (let index = 0; index < neetItem; index++) {
        //     arr.unshift("0");
        // }

        console.log("----解锁之后的数组为", arr);
        return arr;
        // return ["R", "$", 0, 0, 0, 0, 0, 0, 0];
    }
    @Watch("$vuetify.breakpoint.width")
    onWatchScreen() {
        this.resetCardScale();
    }
    resetCardScale() {
        if (this.$refs.card_node) {
            let scale_width = this.$vuetify.breakpoint.width / 600;
            scale_width = scale_width < 1 ? scale_width : 1;
            if (!this.$mobile) {
                return;
            } else {
                const height = 109;
                const width = 600;
                scale_width = this.$vuetify.breakpoint.width / width;
                scale_width = scale_width < 1 ? scale_width : 1;
                const scale = scale_width;
                //@ts-ignore
                this.$refs.card_node.$el.style.scale = scale;
                const top_count = height * (1 - scale) * 0.5;
                const left_count = width * (1 - scale) * 0.5;
                //@ts-ignore
                this.$refs.card_node.$el.style.top = -top_count + "px";
                //@ts-ignore
                this.$refs.card_node.$el.style.left = -left_count + "px";
                //@ts-ignore
                this.$refs.card_node.$el.style.marginBottom = -top_count * 2 + "px";
            }
        }
    }
}
