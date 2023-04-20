import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogPerformanceDetailMediator from "../mediator/DialogPerformanceDetailMediator";
import DialogPerformanceDetailProxy from "../proxy/DialogPerformanceDetailProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import PageBlur from "@/_skin005/core/PageBlur";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";

@Component
export default class DialogPerformanceDetail extends AbstractView {
    myProxy: DialogPerformanceDetailProxy = this.getProxy(DialogPerformanceDetailProxy);
    pageData = this.myProxy.pageData;
    parameter = this.myProxy.parameter;
    listQuery = this.pageData.listQuery;
    categoryType = this.myProxy.categoryIcons;
    LangUtil = LangUtil;
    ModulesHelper = ModulesHelper;
    core = core;
    selfProxy = PanelUtil.getProxy_selfproxy;

    constructor() {
        super(DialogPerformanceDetailMediator);
    }
    typechange = 0;

    transformMoney(val: any) {
        return this.myProxy.transformMoney(val);
    }
    /**图标时间选择 */
    onTimeChange(val: any) {
        this.listQuery.cate = parseInt(val);
        this.onTabClick(this.listQuery.cate);
    }

    onTabClick(cate: number) {
        this.listQuery.cate = cate;
        this.listQuery.page_count = 1;
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.api_user_var_commission_commissiondetail();
            this.myProxy.api_user_var_commission_directswater();
            //this.typechange=0;
            //如果是列表，使用以下数据，否则删除
            // this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
        }
    }
    get_commission_num(item: any, isRebate: boolean = true) {
        const keys = Object.keys(item);
        const coinname = keys[0];
        if (!ModulesHelper.RebateDisplayType() && isRebate) {
            const sss = parseFloat(item[coinname]);
            if (sss == undefined) return this.myProxy.transformMoney_commission(item[coinname], coinname);

            return this.myProxy.transformMoney_commission(sss / 100, coinname) + this.LangUtil("%");
        }

        return this.myProxy.transformMoney_commission(item[coinname], coinname);
    }
    get_commission_yongjin(item: any) {
        const keys = Object.keys(item);
        const coinname = keys[0];
        return CoinTransformHelper.TransformMoney(item[coinname], 2, coinname, coinname);
    }
}
