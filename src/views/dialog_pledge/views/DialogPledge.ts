import AbstractView from "@/core/abstract/AbstractView";
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
        this.myProxy.pageData.amount = this.pageBonusProxy.user_stake_info.amount;
    }

    /**确定质押 */
    handleConfirm() {
        this.myProxy.api_user_var_deposit_stake();
    }

    isCheckedAmount() {
        console.log("dialog_pledge isCheckedAmount");
    }
}
