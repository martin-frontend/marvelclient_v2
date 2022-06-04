import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogManuallyUnstakingMediator from "../mediator/DialogManuallyUnstakingMediator";
import DialogManuallyUnstakingProxy from "../proxy/DialogManuallyUnstakingProxy";
import PageBonusProxy from "../../page_bonus/proxy/PageBonusProxy";

@Component
export default class DialogManuallyUnstaking extends AbstractView {
    myProxy: DialogManuallyUnstakingProxy = this.getProxy(DialogManuallyUnstakingProxy);
    pageBonusProxy: PageBonusProxy = this.getProxy(PageBonusProxy);
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
        this.myProxy.api_user_var_withdraw_stake();
    }

    isCheckedAmount() {
        console.log("dialog_pledge isCheckedAmount");
    }
}
