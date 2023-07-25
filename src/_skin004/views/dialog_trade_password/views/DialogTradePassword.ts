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
import GamePlatConfig from "@/core/config/GamePlatConfig";
import DialogSpeedVerification from "@/_skin004/views/dialog_speed_verification";
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
    get isDragAuth() {
        // return GamePlatConfig.config.auth_types == 2;
        return this.myProxy.isDragAuth;
    }
    get isCheck(): boolean {
        const { password, password_confirm, verify_code } = this.form;
        if (!(this.myProxy.passWordShowType == 1 && this.isDragAuth)) {
            if (!checkVerifyVode(verify_code)) return false;
        }
        return password == password_confirm && checkUserPassword(password);
    }
    get isCheck_logon(): boolean {
        const { password, password_confirm, logonPassword } = this.form;
        return password == password_confirm && checkUserPassword(logonPassword) && checkUserPassword(password);
    }
    getCode() {
        dialog_message_box.alert(LangUtil("请先绑定邮箱或者手机"));
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            if (this.myProxy.passWordShowType == 1 && !this.isDragAuth) this.getImageVerity();
        }
    }

    onSubmit() {
        
        if (!core.checkUserPassword(this.pageData.form.password)) {
            dialog_message.info("输入6个以上字符"); //
        } else if (this.pageData.form.password != this.pageData.form.password_confirm) {
            dialog_message.info("两次输入的密码不一致"); //
        } else {
            if (this.myProxy.passWordShowType == 1 ) {
                if (!this.isDragAuth)
                {
                    if (this.pageData.form.verify_code == "") {
                        dialog_message.info("请输入验证码"); //
                        return;
                    }
                }
                else{
                    const that = this;
                    const successFun = function (val: any) {
                        that.myProxy.pageData.form.verify_code = val;
                        that.myProxy.api_user_change_password_gold_var();
                    };
                    const failFun = function () {
                        that.myProxy.api_public_auth_drag();
                    };
                    that.myProxy.api_public_auth_drag();
                    DialogSpeedVerification.show(successFun, failFun);
                    return;
                }

            } else if (this.myProxy.passWordShowType == 2) {
                if (!core.checkUserPassword(this.pageData.form.logonPassword)) {
                    dialog_message.info("输入6个以上字符"); //
                    return;
                }
            } else if ( this.myProxy.passWordShowType == 3) {
                if (this.pageData.form.verify_code == "") {
                    dialog_message.info("请输入验证码"); //
                    return;
                }
            }

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
    getImageVerity() {
        this.myProxy.api_public_auth_code();
    }
}
