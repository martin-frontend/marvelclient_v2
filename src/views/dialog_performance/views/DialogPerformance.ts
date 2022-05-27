import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import Constant from "@/core/global/Constant";
import { Watch, Component } from "vue-property-decorator";
import DialogPerformanceMediator from "../mediator/DialogPerformanceMediator";
import DialogPerformanceProxy from "../proxy/DialogPerformanceProxy";
import dialog_performance_detail from "@/views/dialog_performance_detail";
import DialogPerformanceDetailProxy from "@/views/dialog_performance_detail/proxy/DialogPerformanceDetailProxy";

@Component
export default class DialogPerformance extends AbstractView {
    dialogPerformanceDetailProxy: DialogPerformanceDetailProxy = this.getProxy(DialogPerformanceDetailProxy);
    myProxy: DialogPerformanceProxy = this.getProxy(DialogPerformanceProxy);
    pageData = this.myProxy.pageData;
    // listQuery = this.pageData.listQuery;

    commonIcon = Assets.commonIcon;

    get timeOptions() {
        return Constant.PERFORMANCE_TIME_TYPE;
    }

    timeSelect = 0;

    constructor() {
        super(DialogPerformanceMediator);
    }

    handlerDetail(date: string) {
        this.dialogPerformanceDetailProxy.parameter.date = date;
        dialog_performance_detail.show();
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            // this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
            this.myProxy.onSelectDay(-6);
        }
    }

    onTimeChange() {
        switch (this.timeSelect) {
            case 0:
                this.myProxy.onSelectDay(-6);
                break;
            case 1:
                this.myProxy.onSelectDay(-29);
                break;
        }
        // this.myProxy.api_user_show_var_bet();
    }

    // onPageChange(val: any) {
    //     this.listQuery.page_count = val;
    //     this.myProxy.api_user_show_var_bet();
    // }
}
