import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogAddressBookProxy from "../proxy/DialogAddressBookProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogAddressBookMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_exchange_method_list];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogAddressBookProxy = getProxy(DialogAddressBookProxy);
        switch(notification.getName()){
            case net.EventType.api_user_var_exchange_method_list:
                myProxy.setData(body);
                break;
        }
    }
}