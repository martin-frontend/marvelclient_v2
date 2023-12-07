import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogSpinLotteryProxy from "../../proxy/DialogSpinLotteryProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import LoginEnter from "@/_skin005/core/global/LoginEnter";

@Component
export default class SpinWheels extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogSpinLotteryProxy = this.getProxy(DialogSpinLotteryProxy);
    gameProxy = PanelUtil.getProxy_gameproxy;
    selfProxy = PanelUtil.getProxy_selfproxy;
    pageData = this.myProxy.pageData;

    @Prop({ default: null }) data!: any;
    setNomal() {
        this.pageData.isSpinning = false;
    }
    /**设置转盘状态 */
    setActive() {
        this.pageData.isSpinning = true;
    }
    clickSpin() {
        if (!core.user_id) {
            this.pageData.bShow = false;
            LoginEnter(() => {});
            return;
        }
        if (this.pageData.isSpinning) return;
        this.myProxy.setData(this.selfProxy.userInfo);
        const curCoin = this.myProxy.getCurLotteryLocationCoin();
        const coin_name_unique = this.gameProxy.coin_name_unique;
        const locationCoinMatchUserCoin = curCoin == coin_name_unique;
        if (!locationCoinMatchUserCoin) {
            PanelUtil.message_alert(LangUtil("请使用{0}进行抽奖", curCoin));
            return;
        }
        if (!this.myProxy.getCurLotteryLocationAvailability()) {
            PanelUtil.message_alert(LangUtil("{0}余额不足", curCoin));
            return;
        }
        this.setActive();
        this.myProxy.handleClickSpinBtn();
    }

    get arrowImg() {
        return require(`@/_skin005/assets/activity_spin/arrow.png`);
    }
    get spinBtnImg() {
        if (this.myProxy.pageData.isSpinning) {
            return require(`@/_skin005/assets/activity_spin/btn/spin_btn_disable.png`);
        }
        return require(`@/_skin005/assets/activity_spin/btn/spin_btn.png`);
    }
    get circleImg() {
        const color = this.myProxy.getColorByLocation(this.myProxy.lotteryAwardData.location);
        return require(`@/_skin005/assets/activity_spin/spinWheels/circles/${color}_circle.png`);
    }
    get roundImg() {
        const color = this.myProxy.getColorByLocation(this.myProxy.lotteryAwardData.location);
        return require(`@/_skin005/assets/activity_spin/spinWheels/roundShapes/${color}Round.png`);
    }
    get colorClass() {
        const color = this.myProxy.getColorByLocation(this.myProxy.lotteryAwardData.location);
        return `text-${color == "blue" ? "green" : color}`;
    }

    get filtered_awards() {
        const lottery_location = this.myProxy.lotteryAwardData.location;
        return this.myProxy.rules.lottery_award.filter((i) => i.lottery_location == lottery_location);
    }

    get award_index() {
        const idx = this.pageData.award_index;
        const index = this.filtered_awards.findIndex((i) => i.award_index == idx);
        return index;
    }
    get awards() {
        const awards = this.filtered_awards.map((i) => {
            const name = i.type == "3" ? `${i.params.value}${i.params.key}` : i.params.key;
            return {
                digits: i.params.value.length,
                type: i.type,
                name,
            };
        });
        return awards;
    }
}
