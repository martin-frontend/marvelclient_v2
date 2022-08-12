import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { checkMail, checkPhone, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_get_verity from "@/_skin100/views/dialog_get_verity";
import { Watch, Component } from "vue-property-decorator";
import DialogSafetyCenterMediator from "../mediator/DialogSafetyCenterMediator";
import DialogSafetyCenterProxy from "../proxy/DialogSafetyCenterProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";

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

    areaCodeSearch = "";
    areaCodeList = this.pageData.areaCode;
    areaCodeMenu = false;

    icons = {
        mm: require("@/_skin100/assets/register/mm.png"),
        tjr: require("@/_skin100/assets/register/tjr.png"),
        yhm: require("@/_skin100/assets/register/yhm.png"),
        yzm: require("@/_skin100/assets/register/yzm.png"),
        yx: require("@/_skin100/assets/register/yx.png"),
        sj: require("@/_skin100/assets/register/sj.png"),
        cx: require("@/_skin100/assets/game-search/cx.png"),
    };

    @Watch("pageData.areaCode")
    onWatchAreaCode() {
        this.areaCodeList = this.pageData.areaCode;
    }

    checkPhone = checkPhone;
    checkMail = checkMail;

    constructor() {
        super(DialogSafetyCenterMediator);
    }

    mounted() {
        //安全设置无手机验证
        if (!this.checkValidateType(2)) {
            this.pageData.tabIndex = 1;
        }
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

    getCode() {
        if (this.pageData.tabIndex == 0) {
            dialog_get_verity.showSmsVerity(1, this.formBindPhone.area_code, this.formBindPhone.mobile);
        } else {
            dialog_get_verity.showEmailVerity(7, this.formBindEmail.email);
        }
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
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}
