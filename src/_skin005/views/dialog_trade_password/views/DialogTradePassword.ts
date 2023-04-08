import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogTradePasswordMediator from "../mediator/DialogTradePasswordMediator";
import DialogTradePasswordProxy from "../proxy/DialogTradePasswordProxy";
import LangUtil from "@/core/global/LangUtil";
import { checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class DialogTradePassword extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogTradePasswordProxy = this.getProxy(DialogTradePasswordProxy);
    selfProxy = PanelUtil.getProxy_selfproxy;
    getverityProxy = PanelUtil.getProxy_get_verityProxy;
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

    get isCheck_logon(): boolean {
        const { password, password_confirm, logonPassword } = this.form;
        return password == password_confirm && checkUserPassword(logonPassword) && checkUserPassword(password);
    }

    getCode() {
        PanelUtil.message_alert(LangUtil("请先绑定邮箱或者手机"));
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            if (this.myProxy.passWordShowType == 1) this.getImageVerity();
        }
    }

    onSubmit() {
        // this.pageData.loading = true;
        if (!core.checkUserPassword(this.pageData.form.password)) {
            PanelUtil.message_info("输入6个以上字符"); //
        } else if (this.pageData.form.password != this.pageData.form.password_confirm) {
            PanelUtil.message_info("两次输入的密码不一致"); //
        } else {
            if (this.myProxy.passWordShowType == 1 || this.myProxy.passWordShowType == 3) {
                if (this.pageData.form.verify_code == "") {
                    PanelUtil.message_info("请输入验证码"); //
                    return;
                }
            } else if (this.myProxy.passWordShowType == 2) {
                if (!core.checkUserPassword(this.pageData.form.logonPassword)) {
                    PanelUtil.message_info("输入6个以上字符"); //
                    return;
                }
            }

            this.myProxy.api_user_change_password_gold_var();
        }
    }

    goSetPhone() {
        PanelUtil.openpanel_safety_center(0);
    }

    goSetEmail() {
        PanelUtil.openpanel_safety_center(1);
    }
    public get verityString(): string {
        if (this.getverityProxy.pageData.downcount > 0) {
            return this.getverityProxy.pageData.downcount + "";
        } else {
            return LangUtil("获取验证码");
        }
    }

    public get isdeisable(): boolean {
        if (!this.getverityProxy || !this.getverityProxy.pageData || !this.getverityProxy.pageData.downcount) return false;

        console.log(" 获取验证码 中的数据", this.getverityProxy.pageData.downcount);
        return this.getverityProxy.pageData.downcount > 0;
    }
    //发送 手机验证码
    sendVerith() {
        if (this.userInfo.phone || this.userInfo.email) {
            const obj = {
                category: this.userInfo.phone ? 1 : 0,
                type: 5,
            };
            PanelUtil.openpanel_get_verity(obj);
        } else {
            //PanelUtil.message_alert(LangUtil("请先绑定邮箱或者手机"));
            PanelUtil.message_confirm({
                message: LangUtil("请先绑定邮箱或者手机"),
                okFun: () => {
                    PanelUtil.openpanel_safety_center();
                },
            });
        }
    }

    getImageVerity() {
        this.myProxy.api_public_auth_code();
    }
}
