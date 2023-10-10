import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogUserCenterMediator from "../mediator/DialogUserCenterMediator";
import DialogUserCenterProxy from "../proxy/DialogUserCenterProxy";
import LangUtil from "@/core/global/LangUtil";

import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin030/core/PanelUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import ModulesHelper from "@/_skin030/core/ModulesHelper";
import GlobalVar from "@/core/global/GlobalVar";

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
    ModulesHelper = ModulesHelper;
    GlobalVar = GlobalVar;
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

    get menuList() {
        const list = {
            1: { id: 1, name: "账号", onclick: null },
            2: { id: 2, name: "ID", onclick: this.copy },
            3: { id: 3, name: "真实姓名", onclick: this.handlerRealName },
            4: { id: 4, name: "CPF", onclick: this.handlerCPF },
            5: { id: 5, name: "昵称", onclick: null },
            6: { id: 6, name: "手机", onclick: this.goSetPhone },
            7: { id: 7, name: "邮箱", onclick: this.goSetEmail },
            8: { id: 8, name: "谷歌验证", onclick: this.goSetGoogleSettings },
            9: { id: 9, name: "交易密码", onclick: this.handlerTradePassword },
        };
        const newList = <any>[];
        newList.push(list[1]);
        newList.push(list[2]);
        if (!ModulesHelper.IsShow_HideRealName()) {
            newList.push(list[3]);
        }
        if (ModulesHelper.IsShow_SetCPF()) {
            newList.push(list[4]);
        }
        newList.push(list[5]);
        if (this.checkValidateType(2)) newList.push(list[6]);

        if (this.checkValidateType(1) && !ModulesHelper.IsShow_HideEmail()) newList.push(list[7]);
        if (ModulesHelper.IsShow_GoogleVerification()) newList.push(list[8]);
        if (this.is_password_gold_transfer.is_open) newList.push(list[9]);
        return newList;
    }
    /**返回对象应该显示的值 */
    getitemValue(item: any) {
        switch (item.id) {
            case 1:
                return this.userInfo.username;
            case 2:
                return this.userInfo.user_id;
            case 3:
                return this.userInfo.real_name || LangUtil("未设置");
            case 4:
                return this.userInfo.cpf || LangUtil("未设置");
            case 5:
                return this.userInfo.nick_name != this.userInfo.user_id ? this.userInfo.nick_name : LangUtil("未设置");
            case 6:
                return this.userInfo.phone != "" && this.userInfo.phone != undefined ? this.userInfo.phone : LangUtil("未设置");
            case 7:
                return this.userInfo.email != "" && this.userInfo.email != undefined ? this.userInfo.email : LangUtil("未设置");
            case 8:
                return this.userInfo.is_google_scan == 0 ? LangUtil("未设置") : LangUtil("已设置");
            case 9:
                return this.userInfo.password_gold_exists ? LangUtil("已设置") : LangUtil("未设置");
            default:
                break;
        }
    }
    /**返回对象是否可以被点击 */
    getItemIsCanClick(item: any) {
        if (item.id == 3) return !this.userInfo.real_name;
        if (item.id == 4) return !this.userInfo.cpf;
        if (item.id == 5) return !(this.userInfo.nick_name != this.userInfo.user_id);
        if (item.id == 6) return !(this.userInfo.phone != "" && this.userInfo.phone != undefined);
        if (item.id == 7) return !(this.userInfo.email != "" && this.userInfo.email != undefined);
        if (item.id == 9) return !this.userInfo.password_gold_exists;

        return true;
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
    handlerCPF() {
        //设置CPF
        PanelUtil.openpanel_real_name(true);
    }

    handlerNickName() {
        PanelUtil.openpanel_nick_name();
    }

    handlerTradePassword() {
        //PanelUtil.openpanel_trade_password();
        PanelUtil.openpanel_safety_center(3);
    }

    handlerPersonalCard() {
        PanelUtil.openpanel_personal_card(this.userInfo.business_card);
    }
}
