import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import { amountFormat } from "@/core/global/Functions";
import Assets from "@/_skin005/assets/Assets";
import PageLossCommissionProxy from "../../proxy/PageLossCommissionProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import DialogClean from "@/_skin005/core/DialogClean";
import PageBlur from "@/_skin005/core/PageBlur";

@Component
export default class DlgPerformance extends AbstractView {
    LangUtil = LangUtil;
    amountFormat = amountFormat;
    CoinTransformHelper = CoinTransformHelper;
    commonIcon = Assets.commonIcon;
    myProxy: PageLossCommissionProxy = this.getProxy(PageLossCommissionProxy);

    performance = this.myProxy.pageData.performance;

    get coinSymbol() {
        return GamePlatConfig.getcoin_symbol(GamePlatConfig.getMainCoin());
    }

    onOpenDirectDetail(item: any) {
        const { created_date } = item;
        const { directDetail } = this.myProxy.pageData;
        directDetail.bShow = true;
        directDetail.listQuery.page_count = 0;
        this.myProxy.api_user_var_direct_commission_direct_index(created_date);
    }

    onClose() {
        this.performance.bShow = false;
    }

    @Watch("performance.bShow")
    onWatchShow() {
        DialogClean();
        PageBlur.blur_page(this.performance.bShow);
    }
}
