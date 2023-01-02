import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { checkMail, checkPhone, checkUserName, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_get_verity from "@/views/dialog_get_verity";
import dialog_google_verification from "@/views/dialog_google_verification";
import dialog_message from "@/views/dialog_message";
import dialog_register from "@/_skin004/views/dialog_register";
import { Component, Watch } from "vue-property-decorator";
import DialogLoginMediator from "../mediator/DialogLoginMediator";
import DialogLoginProxy from "../proxy/DialogLoginProxy";

@Component
export default class DialogLogin extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogLoginProxy = this.getProxy(DialogLoginProxy);
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    pageData = this.myProxy.pageData;
    forgetData = this.myProxy.forgetData;

    areaCodeMenu = false;
    areaCodeSearch = "";
    areaCodeList: any = [];

    userInfo = this.selfProxy.userInfo;

    constructor() {
        super(DialogLoginMediator);
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
        dialog_register.show();
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
        BlurUtil(this.pageData.bShow);
    }
}
