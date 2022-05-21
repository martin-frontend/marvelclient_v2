import AbstractView from "@/core/abstract/AbstractView";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_wallet from "@/views/dialog_wallet";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class UserPanel extends AbstractView {
    menuList = [
        { id: 0, name: "安全中心", icon: "mdi-shield-check" },
        { id: 1, name: "平台钱包", icon: "mdi-clock" },
        { id: 2, name: "投注记录", icon: "mdi-bell" },
        { id: 3, name: "消息中心", icon: "mdi-bell" },
        { id: 4, name: "CFBC记录", icon: "mdi-bell" },
    ];
    activityGroup = {
        title: "优惠活动",
        list: [
            { id: 0, name: "安全中心", icon: "mdi-shield-check" },
            { id: 1, name: "历史记录", icon: "mdi-clock" },
            { id: 2, name: "消息中心", icon: "mdi-bell" },
        ],
    };
    langGroup = [
        { id: 0, name: "中文简体", icon: require(`@/assets/icon/lang/icon_zh.png`) },
        { id: 1, name: "English", icon: require(`@/assets/icon/lang/icon_en.png`) },
    ];

    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    userInfo = this.selfProxy.userInfo;

    onLoginOut() {
        this.selfProxy.api_user_logout();
    }

    onMenuItem(item:any){
        console.log(">>>>>>>>>>>>>>>.")
        switch(item.id){
            case 1:
                dialog_wallet.show();
                break;
        }
    }
}
