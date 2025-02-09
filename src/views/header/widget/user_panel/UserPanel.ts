import AbstractView from "@/core/abstract/AbstractView";
import CopyUtil from "@/core/global/CopyUtil";
import LoginEnter from "@/core/global/LoginEnter";
import SelfProxy from "@/proxy/SelfProxy";
import router from "@/router";
import dialog_activity from "@/views/dialog_activity";
import dialog_bet_record from "@/views/dialog_bet_record";
import dialog_email from "@/views/dialog_email";
import dialog_safety_center from "@/views/dialog_safety_center";
import dialog_wallet from "@/views/dialog_wallet";
import page_extension from "@/views/page_extension";
import page_introduce from "@/views/page_introduce";
import page_mine from "@/views/page_mine";
import page_bonus from "@/views/page_bonus";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import dialog_user_center from "@/views/dialog_user_center";
import dialog_message from "@/views/dialog_message";

@Component
export default class UserPanel extends AbstractView {
    LangUtil = LangUtil;
    menuList = [
        { id: 0, name: LangUtil("个人中心"), icon: "mdi-account-circle" },
        { id: 1, name: LangUtil("安全中心"), icon: "mdi-shield-check" },
        { id: 2, name: LangUtil("平台钱包"), icon: "mdi-wallet" },
        { id: 3, name: LangUtil("投注记录"), icon: "mdi-text-box" },
        { id: 4, name: LangUtil("消息中心"), icon: "mdi-bell" },
    ];
    menuList1 = [
        { id: 10, name: LangUtil("推广赚钱"), icon: "mdi-hand-extended" },
        { id: 11, name: LangUtil("终身分红"), icon: "mdi-equalizer" },
        { id: 12, name: LangUtil("游戏挖矿"), icon: "mdi-mine" },
        { id: 13, name: LangUtil("精彩活动"), icon: "mdi-gift" },
        { id: 14, name: LangUtil("{0}币介绍", GamePlatConfig.getAwardCoin()), icon: "mdi-alpha-f-circle" },
    ];

    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    userInfo = this.selfProxy.userInfo;
    red_dot_tips = this.selfProxy.red_dot_tips;

    onLoginOut() {
        this.selfProxy.api_user_logout();
    }

    onMenuItem(item: any) {
        switch (item.id) {
            case 0:
                LoginEnter(dialog_user_center.show);
                break;
            case 1:
                LoginEnter(dialog_safety_center.show);
                break;
            case 2:
                LoginEnter(dialog_wallet.show);
                break;
            case 3:
                LoginEnter(dialog_bet_record.show);
                break;
            case 4:
                LoginEnter(dialog_email.show);
                break;
            case 10:
                LoginEnter(page_extension.show);
                break;
            case 11:
                LoginEnter(page_bonus.show);
                break;
            case 12:
                LoginEnter(page_mine.show);
                break;
            case 13:
                dialog_activity.show();
                break;
            case 14:
                page_introduce.show();
                break;
        }
    }

    onCopy(str: any) {
        CopyUtil(str);
        dialog_message.info(LangUtil("复制成功"));
    }
}
