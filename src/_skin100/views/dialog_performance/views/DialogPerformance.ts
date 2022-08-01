import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import Constant from "@/core/global/Constant";
import { Watch, Component } from "vue-property-decorator";
import DialogPerformanceMediator from "../mediator/DialogPerformanceMediator";
import DialogPerformanceProxy from "../proxy/DialogPerformanceProxy";
import dialog_performance_detail from "@/_skin100/views/dialog_performance_detail";
import DialogPerformanceDetailProxy from "@/views/dialog_performance_detail/proxy/DialogPerformanceDetailProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogPerformance extends AbstractView {
    dialogPerformanceDetailProxy: DialogPerformanceDetailProxy = this.getProxy(DialogPerformanceDetailProxy);
    myProxy: DialogPerformanceProxy = this.getProxy(DialogPerformanceProxy);
    pageData = this.myProxy.pageData;
    listOptions = this.myProxy.listOptions;
    listQuery = this.pageData.listQuery;
    LangUtil = LangUtil;

    commonIcon = Assets.commonIcon;

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
            this.myProxy.api_user_var_commission_commissionlist();
        }
    }

    onTimeChange() {
        switch (this.listOptions.timeSelect) {
            case 0:
                this.listQuery.start_date = core.dateFormat(core.getTodayOffset(-6), "yyyy-MM-dd");
                this.listQuery.end_date = core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd");
                break;
            case 1:
                this.listQuery.start_date = core.dateFormat(core.getTodayOffset(-29), "yyyy-MM-dd");
                this.listQuery.end_date = core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd");
                break;
        }
        this.myProxy.api_user_var_commission_commissionlist();
    }
}
