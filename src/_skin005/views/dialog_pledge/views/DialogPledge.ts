import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogPledgeMediator from "../mediator/DialogPledgeMediator";
import DialogPledgeProxy from "../proxy/DialogPledgeProxy";
import PageBonusProxy from "../../page_bonus/proxy/PageBonusProxy";
import LangUtil from "@/core/global/LangUtil";
import PageBlur from "@/_skin005/core/PageBlur";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogPledge extends AbstractView {
    myProxy: DialogPledgeProxy = this.getProxy(DialogPledgeProxy);
    pageBonusProxy: PageBonusProxy = this.getProxy(PageBonusProxy);
    pageData = this.myProxy.pageData;
    LangUtil = LangUtil;

    constructor() {
        super(DialogPledgeMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    /**全部 */
    handleMaxVal() {
        this.myProxy.pageData.amount = this.pageBonusProxy.pageData.user_stake_info.amount;
    }

    /**确定质押 */
    handleConfirm() {
        this.pageData.loading = true;
        this.myProxy.api_user_var_deposit_stake();
    }

    isCheckedAmount() {
        console.log("dialog_pledge isCheckedAmount");
    }
    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }
}
