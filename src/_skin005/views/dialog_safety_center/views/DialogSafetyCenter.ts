import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import { checkMail, checkPhone, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import { Watch, Component } from "vue-property-decorator";
import DialogSafetyCenterMediator from "../mediator/DialogSafetyCenterMediator";
import DialogSafetyCenterProxy from "../proxy/DialogSafetyCenterProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class DialogSafetyCenter extends AbstractView {
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

    typechange="0";

     //手动调用，进入直接进 游戏列表
     mounted(){

        this.myProxy.api_public_area_code();
    }

    tempSelectCode = null;

    public get areaCodeArr() : any {
        return this.myProxy.pageData.areaCode;
    }
    
    public get curShowCode() : string {
        return "+" + this.formBindPhone.area_code
    }
    
    @Watch("tempSelectCode")
    onBankInfoChange() {
        console.log("区号值变化了", this.tempSelectCode);
        if ( ! this.tempSelectCode) return;
        //@ts-ignore
        this.formBindPhone.area_code = this.tempSelectCode.area_code;
    }

    customFilter (item:any, queryText:any, itemText:any) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.area_code +"";
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      }
      
     /**图标时间选择 */
     onTimeChange(val: any) {
        //console.log("点击的值 为" , val);
        this.pageData.tabIndex = parseInt(val);
        this.onTabClick(this.pageData.tabIndex );
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
        return this.validate_type.includes(val)
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

    // getCode() {
    //     if (this.pageData.tabIndex == 0) {
    //         dialog_get_verity.showSmsVerity(1, this.formBindPhone.area_code, this.formBindPhone.mobile);
    //     } else {
    //         dialog_get_verity.showEmailVerity(7, this.formBindEmail.email);
    //     }
    // }

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
        if(this.pageData.bShow)
        {
            this.typechange = this.pageData.tabIndex +"";
        }
    }
    public get verityString(): string {
        if (this.getverityProxy.pageData.downcount > 0) {
            return this.getverityProxy.pageData.downcount + "";
        }
        else {
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
        }
        PanelUtil.openpanel_get_verity(obj);
    }
    //发送 邮件 验证码
    sendVerithMail() {
        const obj = {
            category: 0,
            type: 7,
            email: this.formBindEmail.email,
        }
        PanelUtil.openpanel_get_verity(obj);
    }
}
