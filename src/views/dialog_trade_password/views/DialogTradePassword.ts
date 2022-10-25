import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogTradePasswordMediator from "../mediator/DialogTradePasswordMediator";
import DialogTradePasswordProxy from "../proxy/DialogTradePasswordProxy";
import LangUtil from "@/core/global/LangUtil";
import { checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_message_box from "@/views/dialog_message_box";
import dialog_safety_center from "@/views/dialog_safety_center";
import DialogSafetyCenterProxy from "@/views/dialog_safety_center/proxy/DialogSafetyCenterProxy";
import dialog_message from "@/views/dialog_message";

@Component
export default class DialogTradePassword extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogTradePasswordProxy = this.getProxy(DialogTradePasswordProxy);
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    safetyCenterProxy: DialogSafetyCenterProxy = this.getProxy(DialogSafetyCenterProxy);
    userInfo = this.selfProxy.userInfo;
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
        return password == password_confirm && checkVerifyVode(verify_code) && checkUserPassword(password);
    }

    getCode() {
        dialog_message_box.alert(LangUtil("请先绑定邮箱或者手机"));
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }

    onSubmit() {
        this.pageData.loading = true;
        if (!core.checkUserPassword(this.pageData.form.password)) {
            dialog_message.info("输入6个以上字符"); //
        } else if (this.pageData.form.password != this.pageData.form.password_confirm) {
            dialog_message.info("两次输入的密码不一致"); //
        } else if (this.pageData.form.verify_code == "") {
            dialog_message.info("请输入验证码"); //
        } else {
            this.myProxy.api_user_change_password_gold_var();
        }
    }

    goSetPhone() {
        this.safetyCenterProxy.pageData.tabIndex = 0;
        dialog_safety_center.show();
    }

    goSetEmail() {
        this.safetyCenterProxy.pageData.tabIndex = 1;
        dialog_safety_center.show();
    }
}
