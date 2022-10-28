import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogOrderProxy from "../proxy/DialogOrderProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogOrderMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogOrderProxy = getProxy(DialogOrderProxy);
        // switch(notification.getName()){}
    }
}