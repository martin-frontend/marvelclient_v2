import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { checkMail, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import dialog_get_verity from "@/views/dialog_get_verity";
import { Component, Watch } from "vue-property-decorator";
import DialogLoginMediator from "../mediator/DialogLoginMediator";
import DialogLoginProxy from "../proxy/DialogLoginProxy";

@Component
export default class DialogLogin extends AbstractView {
    myProxy: DialogLoginProxy = this.getProxy(DialogLoginProxy);
    pageData = this.myProxy.pageData;
    forgetData = this.myProxy.forgetData;

    constructor() {
        super(DialogLoginMediator);
    }

    private checkMail = checkMail;
    ///////////////////忘记密码//////////////////////
    get isCheckedForget(): boolean {
        const { email, email_code, password, password_confirm } = this.forgetData.form;
        return password == password_confirm && checkMail(email) && checkVerifyVode(email_code) && checkUserPassword(password);
    }

    private getCode(){
        dialog_get_verity.password(this.forgetData.form.email);
    }

    private onSubmitForget() {
        this.myProxy.api_user_reset_password();
    }
    //////////////////登录///////////////////////
    get isCheckedLogin(): boolean {
        const { username, password } = this.pageData.form;
        return checkMail(username) && checkUserPassword(password);
    }
    
    private onSubmitLogin() {
        this.myProxy.api_user_login();
    }

    private goForget() {
        this.forgetData.bShow = true;
    }

    private goRegister() {
        // this.myProxy.showRegister();
    }
    /////////////////////////////////////////////
    onClose() {
        if (this.forgetData.bShow) {
            this.forgetData.bShow = false;
        } else {
            this.myProxy.hide();
        }
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}
