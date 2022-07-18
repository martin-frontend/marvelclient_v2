import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPerformanceProxy from "../proxy/DialogPerformanceProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogPerformanceMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_commission_commissionlist];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogPerformanceProxy = getProxy(DialogPerformanceProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_commission_commissionlist:
                myProxy.setCommissionlist(body);
                break;
        }
    }
}
