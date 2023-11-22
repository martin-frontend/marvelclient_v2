import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogSpinLotteryProxy from "../../proxy/DialogSpinLotteryProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class DeductionLevels extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogSpinLotteryProxy = this.getProxy(DialogSpinLotteryProxy);
    pageData = this.myProxy.pageData;
    spinLotteryData = this.myProxy.lotteryAwardData;
    plat_coins = GamePlatConfig.config.plat_coins;

    @Prop({ default: null }) data!: any;
    /**状态  0 正常 1活动 2获得*/
    item_state = 0;

    setLocation(location: 1 | 2 | 3) {
        if (this.pageData.isSpinning) return;
        this.spinLotteryData.location = location;
    }

    getLocationName(location: number) {
        switch (location) {
            case 1:
                return "入门";
            case 2:
                return "中阶";
            case 3:
                return "高阶";
        }
        return "";
    }

    getLocationIcon(location: 1 | 2 | 3) {
        return this.plat_coins[this.myProxy.getCoinNameByLocation(location)]?.icon;
    }

    get isLanguageZh(): boolean {
        const langT = core.lang.substring(0, 2);
        return langT == "zh";
    }
}
