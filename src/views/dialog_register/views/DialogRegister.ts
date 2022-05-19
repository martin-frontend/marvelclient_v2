import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { checkMail, checkPhone, checkUserName, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import dialog_get_verity from "@/views/dialog_get_verity";
import dialog_login from "@/views/dialog_login";
import dialog_service from "@/views/dialog_service";
import { Component, Watch } from "vue-property-decorator";
import DialogRegisterMediator from "../mediator/DialogRegisterMediator";
import DialogRegisterProxy from "../proxy/DialogRegisterProxy";

@Component
export default class DialogRegister extends AbstractView {
    myProxy: DialogRegisterProxy = this.getProxy(DialogRegisterProxy);
    pageData = this.myProxy.pageData;
    form = this.pageData.form;

    constructor() {
        super(DialogRegisterMediator);
    }

    checkUserName = checkUserName;
    checkMail = checkMail;
    checkPhone = checkPhone;

    areaCodeMenu = false;
    areaCodeSearch = "";
    areaCodeList:any = [];

    @Watch("pageData.areaCode")
    onWatchAreaCode(){
        this.areaCodeList = this.pageData.areaCode;
    }
    onTabClick(type: number) {
        this.pageData.form.register_type = type;
        this.myProxy.resetForm();
    }

    getImageVerity(){
        this.myProxy.api_public_auth_code();
    }

    onAreaCodeInput(){
        if(this.areaCodeSearch == ""){
            this.areaCodeList = this.pageData.areaCode;
        }else{
            this.areaCodeList = [];
            for(const item of this.pageData.areaCode){
                if(item.name.indexOf(this.areaCodeSearch) != -1 || item.area_code == this.areaCodeSearch){
                    this.areaCodeList.push(item);
                }
            }
        }
        console.log("this.areaCodeList: ", this.areaCodeList);
    }
    onItemAreaCode(item:any){
        this.pageData.form.area_code = item.area_code;
        this.areaCodeMenu = false;
    }

    get isCheck(): boolean {
        const { username, password, password_confirm, verify_code, register_type } = this.form;
        return (
            password == password_confirm &&
            ((register_type == 1 && checkUserName(username)) ||
                (register_type == 2 && checkMail(username)) ||
                (register_type == 4 && checkPhone(username))) &&
            checkVerifyVode(verify_code) &&
            checkUserPassword(password)
        );
    }

    goLogin() {
        this.pageData.bShow = false;
        dialog_login.show();
    }

    goService() {
        dialog_service.show();
    }

    getCode() {
        if(this.form.register_type == 2){
            dialog_get_verity.showEmailVerity(6, this.form.username);
        }else{
            dialog_get_verity.showSmsVerity(6, this.form.area_code, this.form.username);
        }
    }

    onRegister() {
        this.myProxy.api_user_register();
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if(this.pageData.bShow){
            this.myProxy.api_public_auth_code();
        }
    }
}
