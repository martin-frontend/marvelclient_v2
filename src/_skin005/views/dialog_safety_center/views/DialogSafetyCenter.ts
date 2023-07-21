import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import { checkMail, checkPhone, checkUserPassword, checkVerifyVode, containsAllChars } from "@/core/global/Functions";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import { Watch, Component } from "vue-property-decorator";
import DialogSafetyCenterMediator from "../mediator/DialogSafetyCenterMediator";
import DialogSafetyCenterProxy from "../proxy/DialogSafetyCenterProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GameConfig from "@/core/config/GameConfig";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class DialogSafetyCenter extends AbstractView {
    core = core;
    LangUtil = LangUtil;
    myProxy: DialogSafetyCenterProxy = this.getProxy(DialogSafetyCenterProxy);
    pageData = this.myProxy.pageData;
    formBindPhone = this.pageData.formBindPhone;
    formBindEmail = this.pageData.formBindEmail;
    formChangePassword = this.pageData.formChangePassword;
    validate_type = GamePlatConfig.config.validate_type;
    selfProxy: SelfProxy = getProxy(SelfProxy);
    userInfo = this.selfProxy.userInfo;
    getverityProxy = PanelUtil.getProxy_get_verityProxy;
    areaCodeSearch = "";
    areaCodeList = this.pageData.areaCode;
    areaCodeMenu = false;
    is_password_gold_transfer = GamePlatConfig.config.is_password_gold_transfer;
    typechange = "0";

    email_error_info = ""; //邮箱的错误信息
    //手动调用，进入直接进 游戏列表
    mounted() {
        this.myProxy.api_public_area_code();
    }

    tempSelectCode = null;

    public get areaCodeArr(): any {
        return this.myProxy.pageData.areaCode;
    }

    public get curShowCode(): string {
        return "+" + this.formBindPhone.area_code;
    }

    @Watch("tempSelectCode")
    onBankInfoChange() {
        console.log("区号值变化了", this.tempSelectCode);
        if (!this.tempSelectCode) return;
        //@ts-ignore
        this.formBindPhone.area_code = this.tempSelectCode.area_code;
    }

    customFilter(item: any, queryText: any, itemText: any) {
        const textOne = item.name.toLowerCase();
        const textTwo = item.area_code + "";
        const searchText = queryText.toLowerCase();

        return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
    }

    /**图标时间选择 */
    onTimeChange(val: any) {
        //console.log("点击的值 为" , val);
        this.pageData.tabIndex = parseInt(val);
        this.onTabClick(this.pageData.tabIndex);
    }

    @Watch("pageData.areaCode")
    onWatchAreaCode() {
        this.areaCodeList = this.pageData.areaCode;
    }

    checkPhone = checkPhone;
    checkMail = checkMail;

    constructor() {
        super(DialogSafetyCenterMediator);
    }

    checkValidateType(val: any) {
        return this.validate_type.includes(val);
    }

    get isCheckFormMobile() {
        return checkPhone(this.formBindPhone.mobile) && checkVerifyVode(this.formBindPhone.code);
    }

    get isChckFormEmail() {
        return checkMail(this.formBindEmail.email) && checkVerifyVode(this.formBindEmail.code);
    }

    get isCheckFormPassword() {
        const { password_old, password, password_confirm } = this.formChangePassword;
        return password == password_confirm && checkUserPassword(password_old) && checkUserPassword(password);
    }
    get phoneLength() {
        return GlobalVar.skin == "skin009" ? 10 : 11;
    }
    get passwordTips() {
        if (GameConfig.config.register_regex == 2) {
            return [
                { title: "必须包含字母大写", state: 0, id: 0, select: /[A-Z]/ },
                { title: "必须包含字母小写", state: 0, id: 1, select: /[a-z]/ },
                { title: "必须包含数字", state: 0, id: 2, select: /\d/ },
                { title: "必须包含特殊字符", state: 0, id: 3, select: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/ },
                { title: "长度6-20位", state: 0, id: 4, select: /^.{6,20}$/ },
            ];
        } else {
            return [{ title: "长度6-20位", state: 0, id: 0, select: /^.{6,20}$/ }];
        }
    }
    show = false;
    get passwordConfirmTips() {
        const list = JSON.parse(JSON.stringify(this.passwordTips));
        for (let index = 0; index < this.passwordTips.length; index++) {
            this.passwordTips[index].state = 0;
        }
        list.push({ title: "必须与密码相同", state: 0, id: 50, select: null });

        return list;
    }

    private _checkTips(str: string, tips: any) {
        for (let index = 0; index < tips.length; index++) {
            const element = tips[index];
            let res = false;
            if (element.id == 50) {
                res =
                    !!this.formChangePassword.password &&
                    !!this.formChangePassword.password.trim() &&
                    this.formChangePassword.password == this.formChangePassword.password_confirm;
            } else {
                res = this.passwordTips[element.id].select.test(str);
            }
            // console.log("  当前条件 " + element.title+ " 结果",res);
            element.state = res ? 1 : 0;
        }
    }
    onPasswordInput() {
        this._checkTips(this.formChangePassword.password, this.passwordTips);
    }
    onPasswordConfirmInput() {
        this._checkTips(this.formChangePassword.password_confirm, this.passwordConfirmTips);
    }
    // getCode() {
    //     if (this.pageData.tabIndex == 0) {
    //         dialog_get_verity.showSmsVerity(1, this.formBindPhone.area_code, this.formBindPhone.mobile);
    //     } else {
    //         dialog_get_verity.showEmailVerity(7, this.formBindEmail.email);
    //     }
    // }
    password_error_info = "";
    onPasswordBlur() {
        if (this.formChangePassword.password == "") return;
        if (GameConfig.config.register_regex == 2) {
            if (!checkUserPassword(this.formChangePassword.password)) {
                this.password_error_info = LangUtil("密码太短");
                return;
            }

            if (!containsAllChars(this.formChangePassword.password)) {
                this.password_error_info = LangUtil("用户密码必须是6-20位字母、数字、特殊字符");
                return;
            }
        } else {
            if (!checkUserPassword(this.formChangePassword.password)) {
                // PanelUtil.message_success(LangUtil("密码太短"));
                this.password_error_info = LangUtil("密码太短");
                return;
            }
        }
        this.password_error_info = "";
    }

    onPasswordConfirmBlur() {
        if (this.formChangePassword.password_confirm == "") return;

        if (GameConfig.config.register_regex == 2) {
            if (!checkUserPassword(this.formChangePassword.password_confirm)) {
                this.password_error_info = LangUtil("密码太短");
                return;
            }

            if (!containsAllChars(this.formChangePassword.password_confirm)) {
                this.password_error_info = LangUtil("用户密码必须是6-20位字母、数字、特殊字符");
                return;
            }
        }

        if (!checkUserPassword(this.formChangePassword.password)) {
            // PanelUtil.message_success(LangUtil("密码太短"));
            this.password_error_info = LangUtil("密码太短");
            return;
        }
        if (this.formChangePassword.password !== this.formChangePassword.password_confirm) {
            // PanelUtil.message_success(LangUtil("密码不一致"));
            this.password_error_info = LangUtil("密码不一致");
            return;
        }
        this.password_error_info = "";
    }

    onAreaCodeInput() {
        if (this.areaCodeSearch == "") {
            this.areaCodeList = this.pageData.areaCode;
        } else {
            this.areaCodeList = [];
            for (const item of this.pageData.areaCode) {
                if (item.name.indexOf(this.areaCodeSearch) != -1 || item.area_code == this.areaCodeSearch) {
                    this.areaCodeList.push(item);
                }
            }
        }
    }
    onItemAreaCode(item: any) {
        this.formBindPhone.area_code = item.area_code;
        this.areaCodeMenu = false;
    }

    onTabClick(tabIndex: number) {
        this.pageData.tabIndex = tabIndex;
        this.password_error_info = "";
        this.email_error_info = "";
        this.myProxy.resetForm();
    }

    onBindMobile() {
        this.myProxy.api_user_bind_mobile_var();
    }

    onBindEmail() {
        this.myProxy.api_user_bind_email_var();
    }

    onChangePassword() {
        this.myProxy.api_user_change_password_var();
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.typechange = this.pageData.tabIndex + "";
        }
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
    sendVerithMobile() {
        const obj = {
            category: 1,
            type: 1,
            area_code: this.formBindPhone.area_code,
            mobile: this.formBindPhone.mobile,
        };
        PanelUtil.openpanel_get_verity(obj);
    }
    //发送 邮件 验证码
    sendVerithMail() {
        const obj = {
            category: 0,
            type: 7,
            email: this.formBindEmail.email,
        };
        PanelUtil.openpanel_get_verity(obj);
    }
    onBlurInput() {
        this.formBindEmail.email = this.formBindEmail.email.trim();
        if (!this.formBindEmail.email || this.formBindEmail.email == "") {
            this.email_error_info = "";
            return;
        }
        let errstr = "";
        if (!checkMail(this.formBindEmail.email)) {
            errstr = LangUtil("邮箱格式不正确");
        }
        this.email_error_info = errstr;
        if (errstr) {
            console.log("错误信息", errstr);
            return errstr;
        }
        return "";
    }
    tabOptions = () => {
        if (!this.is_password_gold_transfer.is_open) {
            return {
                0: LangUtil("绑定手机"),
                1: LangUtil("绑定邮箱"),
                2: LangUtil("修改密码"),
            };
        }
        return {
            0: LangUtil("绑定手机"),
            1: LangUtil("绑定邮箱"),
            2: LangUtil("修改密码"),
            3: LangUtil("交易密码"),
        };
    };
}
