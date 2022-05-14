import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogMessageProxy from "../proxy/DialogMessageProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogMessageMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogMessageProxy = getProxy(DialogMessageProxy);
    }
}