import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRecordExchangeProxy from "../proxy/DialogRecordExchangeProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogRecordExchangeMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_exchange_order_list];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogRecordExchangeProxy = getProxy(DialogRecordExchangeProxy);
        switch(notification.getName()){
            case net.EventType.api_user_var_exchange_order_list:
                myProxy.setData(body);
                break;
        }
    }
}