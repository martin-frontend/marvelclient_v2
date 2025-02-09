import AbstractView from "@/core/abstract/AbstractView";
import CopyUtil from "@/core/global/CopyUtil";
import LoginEnter from "@/_skin004/core/global/LoginEnter";
import SelfProxy from "@/proxy/SelfProxy";
import router from "@/router";
import dialog_activity from "@/views/dialog_activity";
import dialog_bet_record from "@/_skin001/views/dialog_bet_record";
import dialog_email from "@/_skin004/views/dialog_email";
import dialog_safety_center from "@/_skin004/views/dialog_safety_center";
import page_extension from "@/_skin004/views/page_extension";
import page_introduce from "@/views/page_introduce";
import page_mine from "@/views/page_mine";
import page_bonus from "@/views/page_bonus";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import dialog_message from "@/views/dialog_message";
import dialog_wallet from "@/_skin001/views/dialog_wallet";
import dialog_agentmanager from "@/_skin001/views/dialog_agent_manager";
import dialog_user_center from "@/_skin004/views/dialog_user_center";
import dialog_directly_backwater from "@/_skin001/views/dialog_directly_backwater";
import dialog_notice from "@/_skin004/views/dialog_notice";
import AudioPlayerProxy from "@/_skin004/views/widget/audio_player/AudioPlayerProxy";
import SkinVariable from "@/_skin004/core/SkinVariable";
import ServiceUtil from "@/_skin004/core/global/ServiceUtil";

@Component
export default class UserPanel extends AbstractView {
    LangUtil = LangUtil;
    menuList = [
        // { id: 0, name: LangUtil("个人中心"), icon: "mdi-account-circle" },
        // { id: 1, name: LangUtil("安全中心"), icon: "mdi-shield-check" },
        { id: 2, name: LangUtil("平台钱包"), icon: "mdi-wallet" },
        { id: 3, name: LangUtil("我的投注"), icon: "mdi-text-box" },
        { id: 4, name: LangUtil("消息中心"), icon: "mdi-bell" },
        { id: 5, name: LangUtil("公告中心"), icon: "mdi-message-bulleted" },
        { id: 6, name: LangUtil("客服"), icon: "mdi-contacts" },
    ];
    // menuList1 = [
    //     { id: 10, name: LangUtil("推广赚钱"), icon: "mdi-hand-extended" },
    //     // { id: 11, name: LangUtil("终身分红"), icon: "mdi-equalizer" },
    //     { id: 12, name: LangUtil("游戏挖矿"), icon: "mdi-mine" },
    //     { id: 13, name: LangUtil("精彩活动"), icon: "mdi-gift" },
    //     // { id: 14, name: LangUtil("{0}币介绍", GamePlatConfig.getAwardCoin()), icon: "mdi-alpha-f-circle" },
    // ];

    get menuList1() {
        const list = [
            // { id: 10, name: LangUtil("推广赚钱"), icon: "mdi-hand-extended" },
            //{ id: 11, name: LangUtil("终身分红"), icon: "mdi-equalizer" },
            { id: 12, name: LangUtil("游戏挖矿"), icon: "mdi-mine" },
            { id: 13, name: LangUtil("精彩活动"), icon: "mdi-gift" },
            //{ id: 14, name: LangUtil("{0}币介绍", GamePlatConfig.getAwardCoin()), icon: "mdi-alpha-f-circle" },
        ];

        if (GamePlatConfig.config.is_show_commission.is_open == 0 || this.isShowDirectly == 0) {
            list.shift();
        }

        // if (this.isShowDirectly == 2) {
        //     list.unshift({ id: 10, name: LangUtil("代理管理"), icon: "mdi-hand-extended" });
        // }
        // if (this.selfProxy.userInfo.is_credit_user == 1) {
        //     list.unshift({ id: 15, name: LangUtil("我的返水"), icon: "mdi-medal" });
        // }
        return list;
    }

    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    audioProxy: AudioPlayerProxy = this.getProxy(AudioPlayerProxy);
    userInfo = this.selfProxy.userInfo;
    red_dot_tips = this.selfProxy.red_dot_tips;
    SkinVariable = SkinVariable;

    onLoginOut() {
        this.selfProxy.api_user_logout();
    }

    public get isShowDirectly(): number {
        if (!(this.selfProxy && this.selfProxy.userInfo && this.selfProxy.userInfo.user_id != 0)) {
            return 0;
        }
        if (this.selfProxy.userInfo.show_promote == 1) {
            return 1;
        }
        if (this.selfProxy.userInfo.show_promote == 2) {
            return 2;
        }

        return 0;
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
                //LoginEnter(dialog_bet_record.show);
                dialog_bet_record.show(null, "", "", true, { bShowIsMine: true });
                break;
            case 4:
                LoginEnter(dialog_email.show);
                break;
            case 5:
                LoginEnter(dialog_notice.show);
                break;
            case 6:
                ServiceUtil();;
                break;
            case 10:
                // if (this.isShowDirectly == 2) {
                //     LoginEnter(dialog_agentmanager.show);
                // } else if (this.isShowDirectly == 1) {
                LoginEnter(page_extension.show);
                // } else {
                //     console.log("不正确", this.isShowDirectly);
                // }

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
            case 15:
                dialog_directly_backwater.show(null, true);
                break;
        }
    }

    onCopy(str: any) {
        CopyUtil(str);
        dialog_message.info(LangUtil("复制成功"));
    }
}
