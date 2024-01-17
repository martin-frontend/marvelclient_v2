import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogKycProxy from "../proxy/DialogKycProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogKycMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        // const body = notification.getBody();
        // const myProxy:DialogKycProxy = getProxy(DialogKycProxy);
        // switch(notification.getName()){}
    }
}