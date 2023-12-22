import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogSafetyCenterProxy from "../../proxy/DialogSafetyCenterProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class TradePassword extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogSafetyCenterProxy = this.getProxy(DialogSafetyCenterProxy);
    selfProxy = PanelUtil.getProxy_selfproxy;
    getverityProxy = PanelUtil.getProxy_get_verityProxy;
    userInfo = this.selfProxy.userInfo;
    pageData = this.myProxy.pageData;
    form = this.pageData.form;

    mounted() {
        this.error_info = "";
        if (this.myProxy.passWordShowType == 1) this.getImageVerity();
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
    get isDragAuth() {
        return GamePlatConfig.config.auth_types == 2;
    }
    getCode() {
        PanelUtil.message_alert(LangUtil("请先绑定邮箱或者手机"));
    }

    // @Watch("pageData.bShow")
    // onWatchShow() {
    //     PageBlur.blur_page(this.pageData.bShow);
    //     if (this.pageData.bShow) {
    //         this.error_info = "";
    //         if (this.myProxy.passWordShowType == 1) this.getImageVerity();
    //     }
    // }
    validatePassword(password: string): boolean {
        // Check length
        if (password.length < 6 || password.length > 20) {
            PanelUtil.message_info("请输入6-20位密码"); //
            return false;
        }
        // Check for spaces
        if (password.indexOf(" ") >= 0) {
            PanelUtil.message_info("密码不能有空格"); //
            return false;
        }
        // If we made it this far, it's valid
        return true;
    }

    onSubmit() {
        if (!this.validatePassword(this.pageData.form.password)) {
            return;
        } else if (this.pageData.form.password != this.pageData.form.password_confirm) {
            PanelUtil.message_info("两次输入的密码不一致"); //
        } else {
            if (this.myProxy.passWordShowType == 1) {
                if (this.isDragAuth) {
                    const that = this;
                    const successFun = function (val: any) {
                        that.myProxy.pageData.form.verify_code = val;
                        that.myProxy.api_user_change_password_gold_var();
                    };
                    const failFun = function () {
                        that.myProxy.api_public_auth_drag();
                    };
                    that.myProxy.api_public_auth_drag();
                    PanelUtil.openpanel_speed_verification(successFun, failFun, this.myProxy.pageData.auth_drag_position);
                    return;
                } else {
                    if (this.pageData.form.verify_code == "") {
                        PanelUtil.message_info("请输入验证码"); //
                        return;
                    }
                }
            } else if (this.myProxy.passWordShowType == 2) {
                if (!checkUserPassword(this.pageData.form.logonPassword)) {
                    return;
                }
                // if (!core.checkUserPassword(this.pageData.form.logonPassword)) {
                //     PanelUtil.message_info("输入6个以上字符"); //
                //     return;
                // }
            } else if (this.myProxy.passWordShowType == 3) {
                if (this.pageData.form.verify_code == "") {
                    PanelUtil.message_info("请输入验证码"); //
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
        /**只用邮箱验证 */
        if (this.myProxy.passWordShowType == 4) {
            if (!this.userInfo.email) {
                PanelUtil.message_confirm({
                    message: LangUtil("请先绑定邮箱或者手机"),
                    okFun: () => {
                        PanelUtil.openpanel_safety_center(1);
                    },
                });
                return;
            }
            const obj = {
                category: 0,
                type: 5,
            };
            PanelUtil.openpanel_get_verity(obj);
            return;
        }
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
                    PanelUtil.openpanel_safety_center(1);
                },
            });
        }
    }

    getImageVerity() {
        if (!this.isDragAuth) this.myProxy.api_public_auth_code();
    }

    error_info = "";
    onBlurInput() {
        let errstr = "";
        if (!this.form.password || !this.form.password_confirm) {
            this.error_info = "";
            return;
        }
        if (this.form.password != this.form.password_confirm) {
            errstr = LangUtil("两次输入的密码不一致");
            this.error_info = errstr;
            return errstr;
        }

        if (!checkUserPassword(this.form.password)) {
            errstr = LangUtil("请输入6-20位密码");
            this.error_info = errstr;
            return errstr;
        }
        this.error_info = errstr;
        return "";
    }
}
