import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { checkMail, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import dialog_get_verity from "@/views/dialog_get_verity";
import dialog_login from "@/views/dialog_login";
import dialog_service from "@/views/dialog_service";
import { Component, Watch } from "vue-property-decorator";
import DialogRegisterMediator from "../mediator/DialogRegisterMediator";
import DialogRegisterProxy from "../proxy/DialogRegisterProxy";

@Component
export default class DialogRegister extends AbstractView {
    myProxy: DialogRegisterProxy = this.getProxy(DialogRegisterProxy);
    pageData = this.myProxy.pageData;
    form = this.pageData.form;

    constructor() {
        super(DialogRegisterMediator);
    }

    checkMail = checkMail;

    get isCheck(): boolean {
        const { email, password, password_confirm, email_code } = this.form;
        return password == password_confirm && checkMail(email) && checkUserPassword(password) && checkVerifyVode(email_code);
    }

    goLogin() {
        dialog_login.show();
    }

    goService() {
        dialog_service.show();
    }

    getCode() {
        dialog_get_verity.register(this.form.email);
    }

    onRegister() {
        this.myProxy.api_user_register();
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}
