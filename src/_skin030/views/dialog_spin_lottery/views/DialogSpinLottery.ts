import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogSpinLotteryMediator from "../mediator/DialogSpinLotteryMediator";
import DialogSpinLotteryProxy from "../proxy/DialogSpinLotteryProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import PageBlur from "@/_skin030/core/PageBlur";
@Component
export default class DialogDailyTask extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogSpinLotteryProxy = this.getProxy(DialogSpinLotteryProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogSpinLotteryMediator);
    }

    mounted() {
        this.myProxy.api_plat_activity();
    }

    onClose() {
        if (this.pageData.isSpinning) return;
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.activityId")
    onWatchActivityId() {
        if (this.pageData.activityId && this.pageData.bShow) {
            this.myProxy.api_plat_activity_var(this.pageData.activityId);
        }
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.activityId && this.pageData.bShow) {
            this.myProxy.api_plat_activity_var(this.pageData.activityId);
        }
        if (this.pageData.bShow) {
            this.$nextTick(() => {
                this.resetCardScale();
            });
        } else {
            this.pageData.award_index = -1;
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
        if (this.$refs.card_node) {
            let scale_height = (this.$vuetify.breakpoint.height * 0.88) / 1300;
            let scale_width = this.$vuetify.breakpoint.width / 650;
            scale_height = scale_height < 1 ? scale_height : 1;
            scale_width = scale_width < 1 ? scale_width : 1;
            // if (!this.$xsOnly) {
            const height = 1150;
            const width = 650;
            const top_count = height * (1 - scale_height) * 0.5;
            const left_count = width * (1 - scale_height) * 0.5;
            //@ts-ignore
            this.$refs.card_node.$el.style.scale = scale_height;
            //@ts-ignore
            this.$refs.card_node.$el.style.top = -top_count + "px";
        }
    }

    /**任务的奖励 */
    getItemAward(item: any): string {
        if (!item || !item.award || !item.award.params) return "";

        let str = "";
        const keys = Object.keys(item.award.params);

        for (let index = 0; index < keys.length; index++) {
            if (index != 0) {
                str = str + " ";
            }
            // str = CoinTransformHelper.GetCoinSymbol(keys[index]) + item.award.params[keys[index]];
            str = item.award.params[keys[index]] + " " + keys[index];
        }
        return str;
    }
}
