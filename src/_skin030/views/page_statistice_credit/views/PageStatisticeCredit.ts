import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageStatisticeCreditMediator from "../mediator/PageStatisticeCreditMediator";
import PageStatisticeCreditProxy from "../proxy/PageStatisticeCreditProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";

@Component
export default class PageStatisticeCredit extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageStatisticeCreditProxy = this.getProxy(PageStatisticeCreditProxy);
    pageData = this.myProxy.pageData;
    core = core;
    constructor() {
        super(PageStatisticeCreditMediator);
    }
    destroyed() {
        super.destroyed();
    }
    mounted() {
        PanelUtil.showAppLoading(false);
        this.pageData.tabIndex = 0;
    }

    typechange = 0;

    /**图标时间选择 */
    onTimeChange(val: any) {
        //this.pageData.tabIndex = parseInt(val);
        this.onTabClick(this.pageData.tabIndex);
    }
    onTabClick(idx: number) {
        this.pageData.tabIndex = idx;

        // if ( this.pageData.tabIndex == 0)
        // {
        //     this.onEnterHomePage();
        // }
    }
    onEnterHomePage() {
        this.myProxy.api_user_var_commission_commissiondetail();
    }
    search() {
        PanelUtil.getProxy_agentmanager.search(this.pageData.search);
    }
}
