import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import dialog_activity from "@/_skin100/views/dialog_activity";
import { Watch, Component } from "vue-property-decorator";
import DialogActivityDetailMediator from "../mediator/DialogActivityDetailMediator";
import DialogActivityDetailProxy from "../proxy/DialogActivityDetailProxy";

@Component
export default class DialogActivityDetail extends AbstractView {
    myProxy: DialogActivityDetailProxy = this.getProxy(DialogActivityDetailProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogActivityDetailMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (!this.pageData.bShow) {
            dialog_activity.show();
        }
    }
}
