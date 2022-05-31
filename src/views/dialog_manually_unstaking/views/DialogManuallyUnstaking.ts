import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogManuallyUnstakingMediator from "../mediator/DialogManuallyUnstakingMediator";
import DialogManuallyUnstakingProxy from "../proxy/DialogManuallyUnstakingProxy";

@Component
export default class DialogManuallyUnstaking extends AbstractView {
    myProxy: DialogManuallyUnstakingProxy = this.getProxy(DialogManuallyUnstakingProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogManuallyUnstakingMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    /**全部 */
    handleMaxVal() {
        console.log("dialog_pledge handleMaxVal");
    }

    /**确定质押 */
    handleConfirm() {
        console.log("dialog_pledge handleConfirm");
    }

    isCheckedAmount() {
        console.log("dialog_pledge isCheckedAmount");
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            // this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
        }
    }
}
