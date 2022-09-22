import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogUserCenterMediator from "../mediator/DialogUserCenterMediator";
import DialogUserCenterProxy from "../proxy/DialogUserCenterProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_message from "@/views/dialog_message";
import page_mine from "@/views/page_mine";
import dialog_nick_name from "@/views/dialog_nick_name";
import dialog_safety_center from "@/views/dialog_safety_center";
import dialog_personal_card from "@/views/dialog_personal_card";
import DialogSafetyCenterProxy from "@/views/dialog_safety_center/proxy/DialogSafetyCenterProxy";
import dialog_trade_password from "@/views/dialog_trade_password";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import dialog_real_name from "@/views/dialog_real_name";
import dialog_google_verification from "@/views/dialog_google_verification";

@Component
export default class DialogUserCenter extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogUserCenterProxy = this.getProxy(DialogUserCenterProxy);
    pageData = this.myProxy.pageData;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    safetyCenterProxy: DialogSafetyCenterProxy = this.getProxy(DialogSafetyCenterProxy);
    userInfo = this.selfProxy.userInfo;
    validate_type = GamePlatConfig.config.validate_type;
    is_password_gold_transfer = GamePlatConfig.config.is_password_gold_transfer;

    constructor() {
        super(DialogUserCenterMediator);
    }

    getHideUsername(str:string){
        return str.substr(0,2)+'***'+str.substr(5,str.split('').length);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }

    onLoginOut() {
        this.selfProxy.api_user_logout();
        this.pageData.bShow = false;
    }

    checkValidateType(val: any) {
        return this.validate_type.includes(val);
    }

    private copy() {
        this.myProxy.copyId();
        dialog_message.warn(LangUtil("复制成功"));
    }

    goMine() {
        this.pageData.bShow = false;
        page_mine.show()
    }

    goSetPhone() {
        this.safetyCenterProxy.pageData.tabIndex = 0
        dialog_safety_center.show()
    }

    goSetEmail() {
        this.safetyCenterProxy.pageData.tabIndex = 1
        dialog_safety_center.show()
    }

    goSetGoogleVerification() {
        dialog_google_verification.show()
    }

    handlerRealName(){
        //设置真实姓名
        dialog_real_name.show();
    }

    handlerNickName() {
        dialog_nick_name.show();
    }

    handlerTradePassword() {
        dialog_trade_password.show();
    }

    handlerPersonalCard() {
        dialog_personal_card.show(this.userInfo.business_card);
    }
}
