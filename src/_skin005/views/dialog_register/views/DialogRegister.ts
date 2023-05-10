import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import { checkMail, checkPhone, checkUserName, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import { Component, Watch } from "vue-property-decorator";
import DialogRegisterMediator from "../mediator/DialogRegisterMediator";
import DialogRegisterProxy from "../proxy/DialogRegisterProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import SkinVariable from "@/_skin005/core/SkinVariable";

@Component
export default class DialogRegister extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRegisterProxy = this.getProxy(DialogRegisterProxy);
    pageData = this.myProxy.pageData;
    form = this.pageData.form;
    core = core;
    getverityProxy = PanelUtil.getProxy_get_verityProxy;
    SkinVariable = SkinVariable;
    IsShow_HideRegisterInvite = ModulesHelper.IsShow_HideRegisterInvite();
    email_error_info = "";
    constructor() {
        super(DialogRegisterMediator);
    }
    checkbox = false;
    public get btn_width(): number {
        if (this.$mobile) {
            return 78;
        } else {
            return 90;
        }
    }
    public get btn_height(): number {
        if (this.$mobile) {
            return 30;
        } else {
            return 36;
        }
    }

    typechange = 0;

    /**图标时间选择 */
    onTimeChange(val: any) {
        //console.log("点击的值 为" , val);
        this.form.register_type = parseInt(val);
        this.onTabClick(this.form.register_type);
    }

    checkUserName = checkUserName;
    checkMail = checkMail;
    checkPhone = checkPhone;

    areaCodeMenu = false;
    areaCodeSearch = "";
    areaCodeList: any = [];

    GamePlatConfig = GamePlatConfig;

    private registerTypes = GamePlatConfig.config.register_types;

    tempSelectCode = null;

    public get areaCodeArr(): any {
        return this.myProxy.pageData.areaCode;
    }

    public get curShowCode(): string {
        return "+" + this.form.area_code;
    }

    @Watch("tempSelectCode")
    onBankInfoChange() {
        console.log("区号值变化了", this.tempSelectCode);
        if (!this.tempSelectCode) return;
        //@ts-ignore
        this.form.area_code = this.tempSelectCode.area_code;
    }

    customFilter(item: any, queryText: any, itemText: any) {
        const textOne = item.name.toLowerCase();
        const textTwo = item.area_code + "";
        const searchText = queryText.toLowerCase();

        return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
    }

    hasInviteUser() {
        return !!core.invite_user_id;
    }

    mounted() {
        //console.warn(this.registerTypes);
        this.myProxy.api_public_area_code();
    }

    @Watch("pageData.areaCode")
    onWatchAreaCode() {
        this.areaCodeList = this.pageData.areaCode;
    }
    onTabClick(type: number) {
        this.pageData.form.register_type = type;
        this.myProxy.resetForm();
        this.areaCodeMenu = false;
    }

    getImageVerity() {
        this.myProxy.api_public_auth_code();
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
        console.log("this.areaCodeList: ", this.areaCodeList);
    }
    onItemAreaCode(item: any) {
        this.pageData.form.area_code = item.area_code;
        this.areaCodeMenu = false;
    }

    get isCheck(): boolean {
        if (this.SkinVariable.isShowRestrictions && !this.checkbox) {
            return false;
        }
        const { username, password, password_confirm, verify_code, register_type, mobile_username } = this.form;
        return (
            password == password_confirm &&
            ((register_type == 1 && checkUserName(username)) ||
                (register_type == 2 && checkMail(username)) ||
                (register_type == 4 && checkPhone(username)) ||
                (register_type == 8 && checkPhone(username) && checkUserName(mobile_username))) &&
            checkVerifyVode(verify_code) &&
            checkUserPassword(password)
        );
    }

    goLogin() {
        //this.pageData.bShow = false;
        this.onClose();
        PanelUtil.openpanel_login();
    }

    goService() {
        PanelUtil.openpanel_service();
    }

    // getCode() {
    //     if (this.form.register_type == 2) {
    //         dialog_get_verity.showEmailVerity(6, this.form.username);
    //     } else {
    //         dialog_get_verity.showSmsVerity(6, this.form.area_code, this.form.username);
    //     }
    // }

    onRegister() {
        this.myProxy.api_user_register();
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.api_public_auth_code();
            this.typechange = 0;
            this.onTimeChange(this.registerTypes[this.typechange]);
            //this.onTabClick(this.form.register_type);
        }
    }

    onUsernameBlur() {
        if (this.form.username == "") return;
        if (this.form.username.length < 4) {
            PanelUtil.message_success(LangUtil("账号小于4位，请重新输入"));
        }
    }
    onMobileUsernameBlur() {
        if (this.form.mobile_username == "") return;
        if (this.form.mobile_username.length < 4) {
            PanelUtil.message_success(LangUtil("账号小于4位，请重新输入"));
        }
    }
    onPasswordBlur() {
        if (this.form.password == "") return;
        if (!checkUserPassword(this.form.password)) {
            PanelUtil.message_success(LangUtil("密码太短"));
        }
    }

    onPasswordConfirmBlur() {
        if (this.form.password_confirm == "") return;
        if (!checkUserPassword(this.form.password)) {
            PanelUtil.message_success(LangUtil("密码太短"));
        }
        if (this.form.password !== this.form.password_confirm) {
            PanelUtil.message_success(LangUtil("密码不一致"));
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
            type: 6,
            area_code: this.form.area_code,
            mobile: this.form.username,
        };
        PanelUtil.openpanel_get_verity(obj);
    }
    //发送 邮件 验证码
    sendVerithMail() {
        const obj = {
            category: 0,
            type: 6,
            email: this.form.username,
        };
        PanelUtil.openpanel_get_verity(obj);
    }
    onBlurInput() {
        this.form.username = this.form.username.trim();
        if (!this.form.username || this.form.username == "") {
            this.email_error_info = "";
            return;
        }
        let errstr = "";
        if (!checkMail(this.form.username)) {
            errstr = LangUtil("邮箱格式不正确");
        }
        this.email_error_info = errstr;
        if (errstr) {
            console.log("错误信息", errstr);
            return errstr;
        }
        return "";
    }
    @Watch("form.register_type")
    ontypechange() {
        this.email_error_info = "";
        this.checkbox = false;
    }
}
