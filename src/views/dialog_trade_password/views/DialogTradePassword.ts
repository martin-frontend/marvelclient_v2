import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogTradePasswordMediator from "../mediator/DialogTradePasswordMediator";
import DialogTradePasswordProxy from "../proxy/DialogTradePasswordProxy";
import LangUtil from "@/core/global/LangUtil";
import { checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import dialog_get_verity from "@/views/dialog_get_verity";


@Component
export default class DialogTradePassword extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogTradePasswordProxy = this.getProxy(DialogTradePasswordProxy);
    pageData = this.myProxy.pageData;
    form = this.pageData.form;

    constructor() {
        super(DialogTradePasswordMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    get isCheck(): boolean {
        const { password, password_confirm, verify_code } = this.form;
        return (
            password == password_confirm &&
            checkVerifyVode(verify_code) &&
            checkUserPassword(password)
        );
    }

    getCode() {
        dialog_get_verity.showSmsVerity(6, this.form.area_code, this.form.verify_code);
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }

    onSubmit() {
        this.pageData.loading = true;
    }
}
