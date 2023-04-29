import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogTimezoneProxy from "../proxy/DialogTimezoneProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogTimezoneMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogTimezoneProxy = getProxy(DialogTimezoneProxy);
        //switch(notification.getName()){}
    }
}