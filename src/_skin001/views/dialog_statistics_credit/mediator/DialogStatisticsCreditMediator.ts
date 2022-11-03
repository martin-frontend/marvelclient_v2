import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogStatisticsCreditProxy from "../proxy/DialogStatisticsCreditProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogStatisticsCreditMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_credit_statistic];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogStatisticsCreditProxy = getProxy(DialogStatisticsCreditProxy);
        switch(notification.getName()){
            case net.EventType.api_user_var_credit_statistic:
                myProxy.setData(body);
                break;
        }
    }
}