import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import Constant from "@/core/global/Constant";
import { Watch, Component } from "vue-property-decorator";
import DialogPerformanceMediator from "../mediator/DialogPerformanceMediator";
import DialogPerformanceProxy from "../proxy/DialogPerformanceProxy";
import dialog_performance_detail from "@/views/dialog_performance_detail";
import DialogPerformanceDetailProxy from "@/views/dialog_performance_detail/proxy/DialogPerformanceDetailProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogPerformance extends AbstractView {
    dialogPerformanceDetailProxy: DialogPerformanceDetailProxy = this.getProxy(DialogPerformanceDetailProxy);
    myProxy: DialogPerformanceProxy = this.getProxy(DialogPerformanceProxy);
    pageData = this.myProxy.pageData;
    LangUtil = LangUtil;

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
    }

    get listHeight() {
        if (this.$vuetify.breakpoint.xsOnly) {
            return this.$vuetify.breakpoint.height - 145;
        } else {
            return 450;
        }
    }
}
