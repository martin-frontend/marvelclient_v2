import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageRechargeMediator from "../mediator/PageRechargeMediator";
import PageRechargeProxy from "../proxy/PageRechargeProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PageRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageRechargeProxy = this.getProxy(PageRechargeProxy);
    pageData = this.myProxy.pageData;
    selfProxy = PanelUtil.getProxy_selfproxy;
    GlobalVar = GlobalVar;
    constructor() {
        super(PageRechargeMediator);
    }
    destroyed() {
        super.destroyed();
    }
    mounted() {
        PanelUtil.showAppLoading(false);
    }
    typechange = 0;

    // /**图标时间选择 */
    // onTimeChange(val: any) {
    //     this.onTabClick(this.pageData.tabIndex);
    // }
    // onTabClick(idx: number) {

    //     this.pageData.tabIndex = idx;
    // }
    goRecord() {
        if (this.pageData.tabIndex == "0") {
            PanelUtil.openpanel_record_recharge();
        } else {
            PanelUtil.openpanel_record_exchange();
        }
        //this.pageData.bShow = false;
    }

    openGoldWater() {
        PanelUtil.openpanel_gold_waterl();
    }
}
