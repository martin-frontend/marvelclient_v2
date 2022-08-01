import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPerformanceDetailProxy from "../proxy/DialogPerformanceDetailProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogPerformanceDetailMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_commission_commissiondetail, net.EventType.api_user_var_commission_directswater];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogPerformanceDetailProxy = getProxy(DialogPerformanceDetailProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_commission_commissiondetail:
                myProxy.setCommissionDetail(body);
                break;
            case net.EventType.api_user_var_commission_directswater:
                myProxy.setCommissionDirectswater(body);
                break;
        }
    }
}
