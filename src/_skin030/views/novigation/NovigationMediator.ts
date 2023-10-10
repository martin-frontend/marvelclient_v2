import AbstractMediator from "@/core/abstract/AbstractMediator";
import NovigationProxy from "./NovigationProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class NovigationMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_activity,
            net.EventType.api_plat_var_notice_index,
            net.EventType.api_user_login,
            net.EventType.api_user_var_notice,
            net.EventType.api_plat_var_notice_popup,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: NovigationProxy = getProxy(NovigationProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_activity:
                myProxy.setActivityData(body);
                break;
            case net.EventType.api_user_login: //用户登录
                setTimeout(() => {
                    PanelUtil.getProxy_selfproxy.api_user_var_notice();
                }, 100);
                break;
            case net.EventType.api_plat_var_notice_index: //公告 弹窗
                setTimeout(() => {
                    const noticeProxy = PanelUtil.getProxy_noticeProxy;
                    if (noticeProxy.data.listType3 && noticeProxy.data.listType3.length > 0) {
                        myProxy.openDialogArr({ name: "dialognotice", sort: 1 });
                    }
                    myProxy.openDialogArr(null);
                }, 100);
                break;
            case net.EventType.api_user_var_notice: // 充值公告
            case net.EventType.api_plat_var_notice_popup: // 充值公告
                setTimeout(() => {
                    if (body && body.length > 0) myProxy.openDialogArr({ name: "rechargenotice", sort: 2, data: body });
                    myProxy.openDialogArr(null);
                }, 100);
                break;
        }
    }
}
