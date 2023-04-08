import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import { checkMail, checkPhone, checkUserName, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { Component, Watch } from "vue-property-decorator";
import DialogLoginMediator from "../mediator/DialogLoginMediator";
import DialogLoginProxy from "../proxy/DialogLoginProxy";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import GlobalVar from "@/core/global/GlobalVar";
import GamePlatConfig from "@/core/config/GamePlatConfig";
@Component
export default class DialogLogin extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogLoginProxy = this.getProxy(DialogLoginProxy);
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    pageData = this.myProxy.pageData;
    forgetData = this.myProxy.forgetData;
    GlobalVar = GlobalVar;
    areaCodeMenu = false;
    areaCodeSearch = "";
    areaCodeList: any = [];
    validate_type = GamePlatConfig.config.validate_type;
    userInfo = this.selfProxy.userInfo;

    getverityProxy = PanelUtil.getProxy_get_verityProxy;
    constructor() {
        super(DialogLoginMediator);
    }
    mounted() {
        this.myProxy.api_public_area_code();
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

    tempSelectCode = <any>null;

    public get areaCodeArr(): any {
        return this.myProxy.forgetData.areaCode;
    }

    public get curShowCode(): string {
        return "+" + this.forgetData.form.area_code;
    }

    @Watch("tempSelectCode")
    onBankInfoChange() {
        console.log("区号值变化了", this.tempSelectCode);
        if (!this.tempSelectCode) return;

        this.forgetData.form.area_code = this.tempSelectCode.area_code;
    }

    customFilter(item: any, queryText: any, itemText: any) {
        const textOne = item.name.toLowerCase();
        const textTwo = item.area_code + "";
        const searchText = queryText.toLowerCase();

        return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
    }

    typechange = 0;

    /**图标时间选择 */
    onTimeChange(val: any) {
        this.forgetData.form.type = parseInt(val) * 2 + 2;
        this.onTabClick(this.forgetData.form.type);
        this.myProxy.resetForm();
    }

    private checkMail = checkMail;
    private checkPhone = checkPhone;
    ///////////////////忘记密码//////////////////////
    @Watch("forgetData.areaCode")
    onWatchAreaCode() {
        this.areaCodeList = this.forgetData.areaCode;
    }
    onTabClick(type: number) {
        this.forgetData.form.type = type;
        this.forgetData.form.username = "";
        this.areaCodeMenu = false;
    }
    get isCheckedForget(): boolean {
        const { type, username, verify_code, password, password_confirm } = this.forgetData.form;
        return (
            password == password_confirm &&
            ((type == 2 && checkMail(username)) || (type == 4 && checkPhone(username))) &&
            checkVerifyVode(verify_code) &&
            checkUserPassword(password)
        );
    }

    // getCode() {
    //     const { type, username, area_code } = this.forgetData.form;
    //     if (this.forgetData.form.type == 2) {
    //         dialog_get_verity.showEmailVerity(2, this.forgetData.form.username);
    //     } else {
    //         dialog_get_verity.showSmsVerity(2, area_code, username);
    //     }
    // }

    onAreaCodeInput() {
        if (this.areaCodeSearch == "") {
            this.areaCodeList = this.forgetData.areaCode;
        } else {
            this.areaCodeList = [];
            for (const item of this.forgetData.areaCode) {
                if (item.name.indexOf(this.areaCodeSearch) != -1 || item.area_code == this.areaCodeSearch) {
                    this.areaCodeList.push(item);
                }
            }
        }
    }
    onItemAreaCode(item: any) {
        this.forgetData.form.area_code = item.area_code;
        this.areaCodeMenu = false;
    }

    private onSubmitForget() {
        this.myProxy.api_user_reset_password();
    }
    //////////////////登录///////////////////////
    get isCheckedLogin(): boolean {
        const { username, password } = this.pageData.form;
        return (checkMail(username) || checkUserName(username) || checkPhone(username)) && checkUserPassword(password);
    }

    private onSubmitLogin() {
        this.myProxy.api_user_login_check();
    }

    private goForget() {
        this.forgetData.bShow = true;
    }

    private goRegister() {
        this.myProxy.hide();
        //dialog_register.show();
        PanelUtil.openpanel_register();
    }
    /////////////////////////////////////////////
    onClose() {
        this.areaCodeMenu = false;
        if (this.forgetData.bShow) {
            this.forgetData.bShow = false;
        } else {
            this.myProxy.hide();
        }
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }
    //发送 手机验证码
    sendVerithMobile() {
        const obj = {
            category: 1,
            type: 2,
            area_code: this.forgetData.form.area_code,
            mobile: this.forgetData.form.username,
        };
        PanelUtil.openpanel_get_verity(obj);
    }
    //发送 邮件 验证码
    sendVerithMail() {
        const obj = {
            category: 0,
            type: 2,
            email: this.forgetData.form.username,
        };
        PanelUtil.openpanel_get_verity(obj);
    }
    checkValidateType(val: any) {
        return this.validate_type.includes(val);
    }
}
