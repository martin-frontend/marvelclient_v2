import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogAddressBookRemarkMediator from "../mediator/DialogAddressBookRemarkMediator";
import DialogAddressBookRemarkProxy from "../proxy/DialogAddressBookRemarkProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";

@Component
export default class DialogAddressBookRemark extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogAddressBookRemarkProxy = this.getProxy(DialogAddressBookRemarkProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogAddressBookRemarkMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }

    onSubmit() {
        this.pageData.loading = true;
        this.myProxy.api_user_var_payment_method_update_var();
    }
}
