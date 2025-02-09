import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { checkMail, checkPhone, checkUserName, checkUserPassword, checkVerifyVode, convert_vi_to_en } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import dialog_get_verity from "@/views/dialog_get_verity";
import dialog_login from "@/_skin004/views/dialog_login";
import dialog_service from "@/_skin004/views/dialog_service";
import { Component, Watch } from "vue-property-decorator";
import DialogRegisterMediator from "../mediator/DialogRegisterMediator";
import DialogRegisterProxy from "../proxy/DialogRegisterProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import dialog_message from "@/views/dialog_message";
import SkinVariable from "@/_skin004/core/SkinVariable";
import DialogSpeedVerification from "@/_skin004/views/dialog_speed_verification";
import ModulesHelper from "@/_skin005/core/ModulesHelper";

@Component
export default class DialogRegister extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRegisterProxy = this.getProxy(DialogRegisterProxy);
    pageData = this.myProxy.pageData;
    SkinVariable = SkinVariable;
    form = this.pageData.form;
    core = core;
    constructor() {
        super(DialogRegisterMediator);
    }
    bankCardInfo = this.myProxy.bankCardInfo;
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
        console.warn(this.registerTypes);
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

    chickString(val: any) {
        if (!val || !val.trim()) {
            return false;
        }
        return true;
    }
    get isCheck(): boolean {
        const { username, password, password_confirm, verify_code, register_type } = this.form;
        if (!this.isDragAuth && !checkVerifyVode(verify_code)) {
            return false;
        }
        if (this.myProxy.isNeedBankInfo) {
            if (!this.chickString(this.myProxy.curBankInfo.cardNumber) || !this.chickString(this.myProxy.curBankInfo.realName))
                return false;
        }
        return (
            password == password_confirm &&
            ((register_type == 1 && checkUserName(username)) ||
                (register_type == 2 && checkMail(username)) ||
                (register_type == 4 && checkPhone(username))) &&
            checkUserPassword(password)
        );
    }
    get isDragAuth() {
        // return GamePlatConfig.config.auth_types == 2;
        return this.myProxy.isDragAuth;
    }
    goLogin() {
        this.pageData.bShow = false;
        dialog_login.show();
    }

    goService() {
        dialog_service.show();
    }

    // getCode() {
    //     if (this.form.register_type == 2) {
    //         dialog_get_verity.showEmailVerity(6, this.form.username);
    //     } else {
    //         dialog_get_verity.showSmsVerity(6, this.form.area_code, this.form.username);
    //     }
    // }

    onRegister() {
        // this.myProxy.api_user_register();
        if (this.isDragAuth && (this.form.register_type == 1 || this.form.register_type == 32)) {
            const that = this;
            const successFun = function (val: any) {
                that.myProxy.pageData.form.verify_code = val;
                that.myProxy.api_user_register();
            };
            const failFun = function () {
                that.myProxy.api_public_auth_drag();
            };
            that.myProxy.api_public_auth_drag();
            DialogSpeedVerification.show(successFun, failFun, this.myProxy.pageData.auth_drag_position);
            return;
        }

        if (ModulesHelper.isNeed_registerVerifiy())
            DialogSpeedVerification.show(() => {
                this.myProxy.api_user_register();
            });
        else this.myProxy.api_user_register();
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            if (!this.isDragAuth) this.myProxy.api_public_auth_code();

            //没有账号注册
            if (!this.registerTypes.includes(1)) {
                if (this.registerTypes.includes(4)) {
                    this.onTabClick(4);
                } else {
                    this.onTabClick(2);
                }
            }

            if (this.myProxy.isNeedBankInfo) {
                this.myProxy.api_plat_var_bank_list();
            }
        }
    }

    onUsernameBlur() {
        if (this.form.username == "") return;
        if (this.form.username.length < 4) {
            dialog_message.success(LangUtil("账号小于4位，请重新输入"));
        }
    }

    onPasswordBlur() {
        if (this.form.password == "") return;
        if (!checkUserPassword(this.form.password)) {
            dialog_message.success(LangUtil("密码太短"));
        }
    }

    onPasswordConfirmBlur() {
        if (this.form.password_confirm == "") return;
        if (!checkUserPassword(this.form.password)) {
            dialog_message.success(LangUtil("密码太短"));
        }
        if (this.form.password !== this.form.password_confirm) {
            dialog_message.success(LangUtil("密码不一致"));
        }
    }
    plat_coins = GamePlatConfig.config.plat_coins;
    bankCard_nameArr = <any>{};
    bankCard_numberArr = <any>{};

    onChange1(val: any) {
        this.myProxy.curBankInfo.coin_name_unique = val;
        this.myProxy.resetCurbankInfo();
    }

    onBankNameBlur() {
        console.log("---->> 银行部分输入名字----");
        if (!this.myProxy.curBankInfo.realName || !this.myProxy.curBankInfo.realName.trim()) {
            return;
        }
        this.myProxy.curBankInfo.realName = convert_vi_to_en(this.myProxy.curBankInfo.realName.trim());
        this.myProxy.curBankInfo.realName = this.myProxy.curBankInfo.realName.toUpperCase();
    }

    bshowAllNameList = false; //是否显示 名字的下拉菜单

    onNameInputInput() {
        this.bshowAllNameList = true;
        //console.log("正在编辑");
    }
    onNameInputBlur() {
        //console.log("失去焦点");
        setTimeout(() => {
            this.bshowAllNameList = false;
        }, 100);
    }
    onNumberInputBlur() {
        console.log(" 银行卡输入结束");
    }
    onNumberInputInput() {
        console.log(" 银行卡输入");
    }
}
