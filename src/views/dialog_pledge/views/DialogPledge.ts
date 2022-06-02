import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogPledgeMediator from "../mediator/DialogPledgeMediator";
import DialogPledgeProxy from "../proxy/DialogPledgeProxy";
import PageBonusProxy from "../../page_bonus/proxy/PageBonusProxy";

@Component
export default class DialogPledge extends AbstractView {
    myProxy: DialogPledgeProxy = this.getProxy(DialogPledgeProxy);
    pageBonusProxy: PageBonusProxy = this.getProxy(PageBonusProxy);
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
        this.myProxy.api_user_var_deposit_stake();
    }

    isCheckedAmount() {
        console.log("dialog_pledge isCheckedAmount");
    }
}
