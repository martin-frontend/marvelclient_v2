import AbstractView from "@/core/abstract/AbstractView";
import CopyUtil from "@/core/global/CopyUtil";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_activity from "@/views/dialog_activity";
import dialog_bet_record from "@/views/dialog_bet_record";
import dialog_email from "@/views/dialog_email";
import dialog_safety_center from "@/views/dialog_safety_center";
import dialog_wallet from "@/views/dialog_wallet";
import page_extension from "@/views/page_extension";
import page_mine from "@/views/page_mine";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class UserPanel extends AbstractView {
    menuList = [
        { id: 0, name: "安全中心", icon: "mdi-shield-check" },
        { id: 1, name: "平台钱包", icon: "mdi-clock" },
        { id: 2, name: "投注记录", icon: "mdi-bell" },
        { id: 3, name: "消息中心", icon: "mdi-bell" },
    ];
    menuList1 = [
        { id: 10, name: "推广赚钱", icon: "mdi-shield-check" },
        { id: 11, name: "终身分红", icon: "mdi-clock" },
        { id: 12, name: "游戏挖矿", icon: "mdi-bell" },
        { id: 13, name: "精彩活动", icon: "mdi-bell" },
        { id: 14, name: "CF币介绍", icon: "mdi-bell" },
    ];

    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    userInfo = this.selfProxy.userInfo;

    onLoginOut() {
        this.selfProxy.api_user_logout();
    }

    onMenuItem(item: any) {
        switch (item.id) {
            case 0:
                dialog_safety_center.show();
                break;
            case 1:
                dialog_wallet.show();
                break;
            case 2:
                dialog_bet_record.show();
                break;
            case 3:
                dialog_email.show();
                break;
            case 10:
                page_extension.show();
                break;
            case 12:
                page_mine.show();
                break;
            case 13:
                dialog_activity.show();
                break;
        }
    }

    onCopy(str: any) {
        CopyUtil(str);
    }
}
