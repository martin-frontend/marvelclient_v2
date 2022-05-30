import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogPledgeMediator from "../mediator/DialogPledgeMediator";
import DialogPledgeProxy from "../proxy/DialogPledgeProxy";

@Component
export default class DialogPledge extends AbstractView {
    myProxy: DialogPledgeProxy = this.getProxy(DialogPledgeProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogPledgeMediator);
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
