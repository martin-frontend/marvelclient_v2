import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogUserCenterMediator from "../mediator/DialogUserCenterMediator";
import DialogUserCenterProxy from "../proxy/DialogUserCenterProxy";
import LangUtil from "@/core/global/LangUtil";

import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import ModulesHelper from "@/_skin005/core/ModulesHelper";

@Component
export default class DialogUserCenter extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogUserCenterProxy = this.getProxy(DialogUserCenterProxy);
    pageData = this.myProxy.pageData;
    selfProxy = PanelUtil.getProxy_selfproxy;
    userInfo = this.selfProxy.userInfo;
    validate_type = GamePlatConfig.config.validate_type;
    is_password_gold_transfer = GamePlatConfig.config.is_password_gold_transfer;
    IsShow_GoogleVerification = ModulesHelper.IsShow_GoogleVerification();
    constructor() {
        super(DialogUserCenterMediator);
    }

    getHideUsername(str: string) {
        return str;
        //return str.substr(0,2)+'***'+str.substr(5,str.split('').length);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);

        // if (this.pageData.bShow)
        // {
        //     PanelUtil.message_confirm({
        //         message: LangUtil("您绑定的上级是信用代理，绑定后不能充值和提现，确定绑定吗？"),
        //         okFun: () => {
        //             console.log("----确定---");
        //         },
        //         cancelFun:()=>{
        //             console.log("----取消----");
        //         },
        //     });
        // }
    }

    onLoginOut() {
        PanelUtil.message_confirm({
            message: LangUtil("是否退出登录"),
            okFun: () => {
                this.selfProxy.api_user_logout();
                PanelUtil.showAppLoading(true);
                //this.pageData.bShow = false;
                this.onClose();
            },
        });
    }

    checkValidateType(val: any) {
        return this.validate_type.includes(val);
    }

    private copy() {
        //console.warn("########")
        this.myProxy.copyId();
    }

    goMine() {
        //this.pageData.bShow = false;
        this.onClose();
        //page_mine.show()
        PanelUtil.openpage_mine();
    }

    goSetPhone() {
        PanelUtil.openpanel_safety_center(0);
    }

    goSetEmail() {
        PanelUtil.openpanel_safety_center(1);
    }

    goSetGoogleSettings() {
        PanelUtil.openpanel_google_settings();
    }

    handlerRealName() {
        //设置真实姓名
        PanelUtil.openpanel_real_name();
    }

    handlerNickName() {
        PanelUtil.openpanel_nick_name();
    }

    handlerTradePassword() {
        PanelUtil.openpanel_trade_password();
    }

    handlerPersonalCard() {
        PanelUtil.openpanel_personal_card(this.userInfo.business_card);
    }
}
