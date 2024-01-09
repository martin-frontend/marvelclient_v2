import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import { amountFormat } from "@/core/global/Functions";
import Assets from "@/_skin005/assets/Assets";
import PageLossCommissionProxy from "../../proxy/PageLossCommissionProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import DialogClean from "@/_skin005/core/DialogClean";
import PageBlur from "@/_skin005/core/PageBlur";

@Component
export default class DlgDirectDetail extends AbstractView {
    LangUtil = LangUtil;
    amountFormat = amountFormat;
    CoinTransformHelper = CoinTransformHelper;
    commonIcon = Assets.commonIcon;
    myProxy: PageLossCommissionProxy = this.getProxy(PageLossCommissionProxy);

    directDetail = this.myProxy.pageData.directDetail;

    get coinSymbol() {
        return GamePlatConfig.getcoin_symbol(GamePlatConfig.getMainCoin());
    }

    onOpenBetRecord(item: any) {
        PanelUtil.openpanel_bet_record(item.user_id);
    }

    onRefresh(done: any) {
        this.directDetail.done = done;
        this.directDetail.finished = false;
        this.directDetail.listQuery.page_count = 0;
        this.myProxy.api_user_var_direct_commission_direct_index();
    }

    onLoad(done: any) {
        const { finished } = this.directDetail;
        if (!finished) {
            this.directDetail.done = done;
            this.directDetail.finished = false;
            this.directDetail.listQuery.page_count++;
            this.myProxy.api_user_var_direct_commission_direct_index();
        } else {
            done();
        }
    }

    onPageChange(val: number) {
        this.directDetail.listQuery.page_count = val;
        this.myProxy.api_user_var_direct_commission_direct_index();
    }

    onClose() {
        this.directDetail.bShow = false;
    }

    @Watch("directDetail.bShow")
    onWatchShow() {
        DialogClean();
        PageBlur.blur_page(this.directDetail.bShow);
    }
}
