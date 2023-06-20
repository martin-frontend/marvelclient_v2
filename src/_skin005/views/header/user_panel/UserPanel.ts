import AbstractView from "@/core/abstract/AbstractView";
import CopyUtil from "@/core/global/CopyUtil";

import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import Assets from "@/_skin005/assets/Assets";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import { List } from "echarts";
import GlobalVar from "@/core/global/GlobalVar";
import SkinVariable from "@/_skin005/core/SkinVariable";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class UserPanel extends AbstractView {
    LangUtil = LangUtil;
    commonIcon = Assets.commonIcon;
    GlobalVar = GlobalVar;
    get menuList() {
        const list = [
            { id: 0, name: LangUtil("个人中心"), icon: "my_info" },
            { id: 2, name: LangUtil("平台钱包"), icon: "yue" },
            { id: 3, name: LangUtil("我的投注"), icon: "bet_my" },
            { id: 4, name: LangUtil("消息中心"), icon: "mail" },
        ];

        if (ModulesHelper.isShow_Fan_shui()) {
            const obj = { id: 15, name: LangUtil("我的返水"), icon: "water" };
            list.splice(4, 0, obj);
        }
        //list.unshift({ id: 15, name: LangUtil("我的返水"), icon: "mdi-medal" });
        if (!ModulesHelper.IsShow_HideSafeCenter()) {
            const obj = { id: 1, name: LangUtil("安全中心"), icon: "sefety" };
            list.splice(1, 0, obj);
        }

        if (SkinVariable.isShowPlatUsersVerification && GamePlatConfig.config.is_user_verification.is_open) {
            const obj = { id: 16, name: LangUtil("用户认证"), icon: "certified" };
            list.splice(2, 0, obj);
        }
        if (ModulesHelper.IsShow_NoticeBtn()) {
            const obj = { id: 5, name: LangUtil("公告中心"), icon: "notice" };
            list.push(obj);
        }
        return list;
    }

    // menuList = [
    //     { id: 0, name: LangUtil("个人中心"), icon: "mdi-account-circle" },
    //     { id: 1, name: LangUtil("安全中心"), icon: "mdi-shield-check" },
    //     { id: 2, name: LangUtil("平台钱包"), icon: "mdi-wallet" },
    //     { id: 3, name: LangUtil("我的投注"), icon: "mdi-text-box" },
    //     { id: 4, name: LangUtil("消息中心"), icon: "mdi-bell" },
    //     list.unshift({ id: 15, name: LangUtil("我的返水"), icon: "mdi-medal" });
    // ];
    get menuList1() {
        return [];
    }

    selfProxy = PanelUtil.getProxy_selfproxy;
    userInfo = this.selfProxy.userInfo;
    red_dot_tips = this.selfProxy.red_dot_tips;
    platUsersVerificationProxy = PanelUtil.getProxy_get_platUsersVerificationProxy;

    onLoginOut() {
        //this.selfProxy.api_user_logout();
        PanelUtil.message_confirm({
            message: LangUtil("是否退出登录"),
            okFun: () => {
                PanelUtil.showAppLoading(true);
                this.selfProxy.api_user_logout();
            },
        });
    }

    onMenuItem(item: any) {
        switch (item.id) {
            case 0:
                PanelUtil.openpanel_user_center();
                break;
            case 1:
                //LoginEnter(dialog_safety_center.show);
                PanelUtil.openpanel_safety_center();
                break;
            case 2:
                PanelUtil.openpanel_wallet();
                //LoginEnter(dialog_wallet.show);
                break;
            case 3:
                //LoginEnter(dialog_bet_record.show);
                //dialog_bet_record.show(null, "", "", true, { bShowIsMine: true });
                PanelUtil.openpanel_bet_record(null, "", "", true, { bShowIsMine: true });
                break;
            case 4:
                PanelUtil.openpanel_mail();
                //LoginEnter(dialog_email.show);
                break;
            case 5:
                PanelUtil.openpanel_notice();
                //LoginEnter(dialog_email.show);
                break;
            case 10:
                // if (this.isShowDirectly == 2) {
                //     //LoginEnter(dialog_agentmanager.show);
                //     PanelUtil.openpanel_agent_manager();
                // } else if (this.isShowDirectly == 1) {
                //     //LoginEnter(page_extension.show);
                //     PanelUtil.openpage_extension();
                // } else {
                console.log("不正确");
                // }

                break;
            case 11:
                PanelUtil.openpage_bonus();
                //LoginEnter(page_bonus.show);
                break;
            case 12:
                PanelUtil.openpage_mine();
                //LoginEnter(page_mine.show);
                break;
            case 13:
                //dialog_activity.show();
                PanelUtil.openpanel_activity();
                break;
            case 14:
                PanelUtil.openpage_introduce();
                //page_introduce.show();
                break;
            case 15:
                //dialog_directly_backwater.show(null, true);
                PanelUtil.openpanel_directly_backwater(null, true);
                break;
            case 16:
                PanelUtil.openpanel_plat_users_verification();
                break;
        }
    }

    onCopy(str: any) {
        CopyUtil(str);
        PanelUtil.message_info(LangUtil("复制成功"));
    }

    get certificationStatus() {
        // const status: any = 3;
        // switch (status) {
        switch (this.selfProxy.userVerificationStatus) {
            case 0:
                return { name: LangUtil("未认证"), icon: "mdi-alert-circle", color: "red" };
            case 1:
                return { name: LangUtil("认证通过"), icon: "mdi-check-circle", color: "success" };

            case 2:
                return { name: LangUtil("认证失败"), icon: "mdi-alert-circle", color: "red" };

            case 3:
                return { name: LangUtil("审核中"), icon: "mdi-clock", color: "orange" };
            default:
                return {};
        }
    }
}
