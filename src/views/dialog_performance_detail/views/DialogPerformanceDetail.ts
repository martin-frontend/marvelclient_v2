import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogPerformanceDetailMediator from "../mediator/DialogPerformanceDetailMediator";
import DialogPerformanceDetailProxy from "../proxy/DialogPerformanceDetailProxy";
import dialog_message from "@/views/dialog_message";

@Component
export default class DialogPerformanceDetail extends AbstractView {
    myProxy: DialogPerformanceDetailProxy = this.getProxy(DialogPerformanceDetailProxy);
    pageData = this.myProxy.pageData;
    parameter = this.myProxy.parameter;
    listQuery = this.pageData.listQuery;
    categoryType = this.myProxy.categoryIcons;

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogPerformanceDetailMediator);
    }

    onTabClick(cate: number) {
        this.listQuery.cate = cate;
        this.listQuery.page_count = 1;
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.api_user_var_commission_commissiondetail();
            this.myProxy.api_user_var_commission_directswater();
            //如果是列表，使用以下数据，否则删除
            // this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
        }
    }
}
