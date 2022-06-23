import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogManuallyUnstakingMediator from "../mediator/DialogManuallyUnstakingMediator";
import DialogManuallyUnstakingProxy from "../proxy/DialogManuallyUnstakingProxy";
import PageBonusProxy from "../../page_bonus/proxy/PageBonusProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogManuallyUnstaking extends AbstractView {
    myProxy: DialogManuallyUnstakingProxy = this.getProxy(DialogManuallyUnstakingProxy);
    pageBonusProxy: PageBonusProxy = this.getProxy(PageBonusProxy);
    pageData = this.myProxy.pageData;
    LangUtil = LangUtil;

    constructor() {
        super(DialogManuallyUnstakingMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    /**全部 */
    handleMaxVal() {
        this.myProxy.pageData.amount = this.pageBonusProxy.pageData.user_stake_info.stake_amount;
    }

    /**确定质押 */
    handleConfirm() {
        this.myProxy.api_user_var_withdraw_stake();
    }

    isCheckedAmount() {
        console.log("dialog_pledge isCheckedAmount");
    }
}
