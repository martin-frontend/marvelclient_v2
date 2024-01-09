import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PageLossCommissionProxy from "../../proxy/PageLossCommissionProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import { amountFormat } from "@/core/global/Functions";
import Assets from "@/_skin005/assets/Assets";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import DialogClean from "@/_skin005/core/DialogClean";
import PageBlur from "@/_skin005/core/PageBlur";

@Component
export default class DlgBonusHistory extends AbstractView {
    LangUtil = LangUtil;
    CoinTransformHelper = CoinTransformHelper;
    commonIcon = Assets.commonIcon;
    myProxy: PageLossCommissionProxy = this.getProxy(PageLossCommissionProxy);

    bonusHistory = this.myProxy.pageData.bonusHistory;

    get coinSymbol() {
        return GamePlatConfig.getcoin_symbol(GamePlatConfig.getMainCoin());
    }

    onOpenPerformance(item: any) {
        const { settlement_date_start, settlement_date_end } = item;
        const { performance } = this.myProxy.pageData;
        performance.bShow = true;
        this.myProxy.api_user_var_direct_commission_index(settlement_date_start, settlement_date_end);
    }

    onRefresh(done: any) {
        this.bonusHistory.done = done;
        this.bonusHistory.finished = false;
        this.bonusHistory.listQuery.page_count = 0;
        this.myProxy.api_user_var_direct_commission_bonus_index();
    }

    onLoad(done: any) {
        const { finished } = this.bonusHistory;
        if (!finished) {
            this.bonusHistory.done = done;
            this.bonusHistory.finished = false;
            this.bonusHistory.listQuery.page_count++;
            this.myProxy.api_user_var_direct_commission_bonus_index();
        } else {
            done();
        }
    }

    onPageChange(val: number) {
        this.bonusHistory.listQuery.page_count = val;
        this.myProxy.api_user_var_direct_commission_bonus_index();
    }

    onClose() {
        this.bonusHistory.bShow = false;
    }

    @Watch("bonusHistory.bShow")
    onWatchShow() {
        DialogClean();
        PageBlur.blur_page(this.bonusHistory.bShow);
    }
}
