import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogAddressBookRemarkMediator from "../mediator/DialogAddressBookRemarkMediator";
import DialogAddressBookRemarkProxy from "../proxy/DialogAddressBookRemarkProxy";
import LangUtil from "@/core/global/LangUtil";

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
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }

    onSubmit() {
        this.pageData.loading = true;
        this.myProxy.api_user_var_payment_method_update_var();
    }
}
