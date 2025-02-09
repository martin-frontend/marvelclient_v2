import AbstractView from "@/core/abstract/AbstractView";
import CopyUtil from "@/core/global/CopyUtil";
import LoginEnter from "@/core/global/LoginEnter";
import SelfProxy from "@/proxy/SelfProxy";
import router from "@/router";
import dialog_activity from "@/_skin100/views/dialog_activity";
import dialog_bet_record from "@/_skin100/views/dialog_bet_record";
import dialog_email from "@/_skin100/views/dialog_email";
import dialog_safety_center from "@/_skin100/views/dialog_safety_center";
import dialog_wallet from "@/_skin100/views/dialog_wallet";
import page_extension from "@/_skin100/views/page_extension";
import page_introduce from "@/views/page_introduce";
import page_mine from "@/_skin100/views/page_mine";
import page_bonus from "@/_skin100/views/page_bonus";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import dialog_user_center from "@/_skin100/views/dialog_user_center";
import dialog_message from "@/_skin100/views/dialog_message";

import aqzx from "@/_skin100/assets/my/aqzx.png";
import aqzx_w from "@/_skin100/assets/my/hover/aqzx.png";
import ptqb from "@/_skin100/assets/my/ptqb.png";
import ptqb_w from "@/_skin100/assets/my/hover/ptqb.png";
import tzjl from "@/_skin100/assets/my/tzjl.png";
import tzjl_w from "@/_skin100/assets/my/hover/tzjl.png";
import xxzx from "@/_skin100/assets/my/xxzx.png";
import xxzx_w from "@/_skin100/assets/my/hover/xxzx.png";
import tgzq from "@/_skin100/assets/my/tgzq.png";
import tgzq_w from "@/_skin100/assets/my/hover/tgzq.png";
import zsfh from "@/_skin100/assets/my/zsfh.png";
import zsfh_w from "@/_skin100/assets/my/hover/zsfh.png";
import yxwk from "@/_skin100/assets/my/yxwk.png";
import yxwk_w from "@/_skin100/assets/my/hover/yxwk.png";
import jchd from "@/_skin100/assets/my/jchd.png";
import jchd_w from "@/_skin100/assets/my/hover/jchd.png";

@Component
export default class UserPanel extends AbstractView {
    LangUtil = LangUtil;
    // menuList = [
    //     { id: 0, name: LangUtil("个人中心"), icon: "mdi-account-circle" },
    //     { id: 1, name: LangUtil("安全中心"), icon: "mdi-shield-check" },
    //     { id: 2, name: LangUtil("平台钱包"), icon: "mdi-wallet" },
    //     { id: 3, name: LangUtil("投注记录"), icon: "mdi-text-box" },
    //     { id: 4, name: LangUtil("消息中心"), icon: "mdi-bell" },
    // ];
    // menuList1 = [
    //     { id: 10, name: LangUtil("推广赚钱"), icon: "mdi-hand-extended" },
    //     { id: 11, name: LangUtil("终身分红"), icon: "mdi-equalizer" },
    //     { id: 12, name: LangUtil("游戏挖矿"), icon: "mdi-mine" },
    //     { id: 13, name: LangUtil("精彩活动"), icon: "mdi-gift" },
    //     { id: 14, name: LangUtil("{0}币介绍", GamePlatConfig.getAwardCoin()), icon: "mdi-alpha-f-circle" },
    // ];
    menuList = [
        // {
        //     id: 0,
        //     name: LangUtil("个人中心"),
        //     icon: aqzx,
        //     icon_white: aqzx_w,
        // },
        {
            id: 1,
            name: LangUtil("安全中心"),
            icon: aqzx,
            icon_white: aqzx_w,
        },
        {
            id: 2,
            name: LangUtil("平台钱包"),
            icon: ptqb,
            icon_white: ptqb_w,
        },
        {
            id: 3,
            name: LangUtil("投注记录"),
            icon: tzjl,
            icon_white: tzjl_w,
        },
        {
            id: 4,
            name: LangUtil("消息中心"),
            icon: xxzx,
            icon_white: xxzx_w,
        },
        // {
        //     id: 0,
        //     name: LangUtil("个人中心"),
        //     icon: require("@/_skin100/assets/my/aqzx.png"),
        //     icon_white: require("@/_skin100/assets/my/hover/aqzx.png"),
        // },
        // {
        //     id: 1,
        //     name: LangUtil("安全中心"),
        //     icon: require("@/_skin100/assets/my/aqzx.png"),
        //     icon_white: require("@/_skin100/assets/my/hover/aqzx.png"),
        // },
        // {
        //     id: 2,
        //     name: LangUtil("平台钱包"),
        //     icon: require("@/_skin100/assets/my/ptqb.png"),
        //     icon_white: require("@/_skin100/assets/my/hover/ptqb.png"),
        // },
        // {
        //     id: 3,
        //     name: LangUtil("投注记录"),
        //     icon: require("@/_skin100/assets/my/tzjl.png"),
        //     icon_white: require("@/_skin100/assets/my/hover/tzjl.png"),
        // },
        // {
        //     id: 4,
        //     name: LangUtil("消息中心"),
        //     icon: require("@/_skin100/assets/my/xxzx.png"),
        //     icon_white: require("@/_skin100/assets/my/hover/xxzx.png"),
        // },
    ];
    menuList1 = [
        {
            id: 10,
            name: LangUtil("推广赚钱"),
            icon: tgzq,
            icon_white: tgzq_w,
        },
        {
            id: 11,
            name: LangUtil("终身分红"),
            icon: zsfh,
            icon_white: zsfh_w,
        },
        {
            id: 12,
            name: LangUtil("游戏挖矿"),
            icon: yxwk,
            icon_white: yxwk_w,
        },
        {
            id: 13,
            name: LangUtil("精彩活动"),
            icon: jchd,
            icon_white: jchd_w,
        },
        // {
        //     id: 10,
        //     name: LangUtil("推广赚钱"),
        //     icon: require("@/_skin100/assets/my/tgzq.png"),
        //     icon_white: require("@/_skin100/assets/my/hover/tgzq.png"),
        // },
        // {
        //     id: 11,
        //     name: LangUtil("终身分红"),
        //     icon: require("@/_skin100/assets/my/zsfh.png"),
        //     icon_white: require("@/_skin100/assets/my/hover/zsfh.png"),
        // },
        // {
        //     id: 12,
        //     name: LangUtil("游戏挖矿"),
        //     icon: require("@/_skin100/assets/my/yxwk.png"),
        //     icon_white: require("@/_skin100/assets/my/hover/yxwk.png"),
        // },
        // {
        //     id: 13,
        //     name: LangUtil("精彩活动"),
        //     icon: require("@/_skin100/assets/my/jchd.png"),
        //     icon_white: require("@/_skin100/assets/my/hover/jchd.png"),
        // },
        // {
        //     id: 14,
        //     name: LangUtil("{0}币介绍", GamePlatConfig.getAwardCoin()),
        //     icon: require("@/_skin100/assets/my/bjs.png"),
        //     icon_white: require("@/_skin100/assets/my/hover/bjs.png"),
        // },
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
            // case 14:
            //     page_introduce.show();
            //     break;
        }
        this.drawerClose();
    }
    userCenterShow() {
        LoginEnter(dialog_user_center.show);
    }
    onCopy(str: any) {
        CopyUtil(str);
        dialog_message.success(LangUtil("复制成功"));
    }
    drawerClose() {
        this.$emit("drawer", false);
    }
}
