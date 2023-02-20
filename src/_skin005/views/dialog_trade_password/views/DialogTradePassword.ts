import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogTradePasswordMediator from "../mediator/DialogTradePasswordMediator";
import DialogTradePasswordProxy from "../proxy/DialogTradePasswordProxy";
import LangUtil from "@/core/global/LangUtil";
import { checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogTradePassword extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogTradePasswordProxy = this.getProxy(DialogTradePasswordProxy);
    selfProxy=PanelUtil.getProxy_selfproxy;

    userInfo = this.selfProxy.userInfo;
    pageData = this.myProxy.pageData;
    form = this.pageData.form;

    constructor() {
        super(DialogTradePasswordMediator);
    }
    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    get isCheck(): boolean {
        const { password, password_confirm, verify_code } = this.form;
        return password == password_confirm && checkVerifyVode(verify_code) && checkUserPassword(password);
    }

    getCode() {
        PanelUtil.message_alert(LangUtil("请先绑定邮箱或者手机"));
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }

    onSubmit() {
        this.pageData.loading = true;
        if (!core.checkUserPassword(this.pageData.form.password)) {
            PanelUtil.message_info("输入6个以上字符"); //
        } else if (this.pageData.form.password != this.pageData.form.password_confirm) {
            PanelUtil.message_info("两次输入的密码不一致"); //
        } else if (this.pageData.form.verify_code == "") {
            PanelUtil.message_info("请输入验证码"); //
        } else {
            this.myProxy.api_user_change_password_gold_var();
        }
    }

    goSetPhone() {
        PanelUtil.openpanel_safety_center(0);
    }

    goSetEmail() {
        PanelUtil.openpanel_safety_center(1);
    }
}
