import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageStatisticeCreditMediator from "../mediator/PageStatisticeCreditMediator";
import PageStatisticeCreditProxy from "../proxy/PageStatisticeCreditProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class PageStatisticeCredit extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageStatisticeCreditProxy = this.getProxy(PageStatisticeCreditProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(PageStatisticeCreditMediator);

        this.onOpenPageHome();
    }


    typechange = 0;

    /**图标时间选择 */
    onTimeChange(val: any) {
        //this.pageData.tabIndex = parseInt(val);
        this.onTabClick(this.pageData.tabIndex);
    }
    onTabClick(idx: number) {

        this.pageData.tabIndex = idx;
        //PanelUtil.getProxy_statistics_credit.reseData();
        PanelUtil.getProxy_statistics_credit.pageData.bShow=false;
        if (idx == 0 )
        {
            this.onOpenPageHome();
        }
        // else if (idx == 11)
        // {
        //     this.onOpenAgente();
        // }
    }

    onOpenPageHome()
    {
        PanelUtil.getProxy_directly_my.resetQuery();
        PanelUtil.getProxy_directly_my.api_user_var_commission_commissiondetail();
        // this.myProxy.resetQuery();
        // this.myProxy.api_user_var_commission_commissiondetail();
    }

    onOpenAgente()
    {
        console.log("-----打开  信用统计---");
        PanelUtil.getProxy_statistics_credit.pageData.bShow=true;
        //PanelUtil.getProxy_statistics_credit.reseData();
        //PanelUtil.getProxy_statistics_credit.onInit();
    }

    search()
    {
        PanelUtil.getProxy_agentmanager.search(this.pageData.search);
    }

    // @Watch("pageData.tabIndex")
    // onWatchShow() {
    //     if (this.pageData.tabIndex != this.typechange)
    //     {
    //         console.log("不想等  this.pageData.tabIndex  " , this.pageData.tabIndex );
    //         console.log("不想等  this.typechange  " , this.typechange );
    //         this.typechange = this.pageData.tabIndex ;
    //     }
    // }

}
