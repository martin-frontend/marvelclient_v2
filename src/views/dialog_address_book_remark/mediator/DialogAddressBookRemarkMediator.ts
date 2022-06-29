import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogAddressBookRemarkProxy from "../proxy/DialogAddressBookRemarkProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogAddressBookRemarkMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogAddressBookRemarkProxy = getProxy(DialogAddressBookRemarkProxy);
        // switch(notification.getName()){}
    }
}