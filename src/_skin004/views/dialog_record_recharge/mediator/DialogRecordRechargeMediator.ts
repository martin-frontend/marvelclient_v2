import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRecordRechargeProxy from "../proxy/DialogRecordRechargeProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogRecordRechargeMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_recharge_list];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogRecordRechargeProxy = getProxy(DialogRecordRechargeProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_recharge_list:
                myProxy.setData(body);
                break;
        }
    }
}
