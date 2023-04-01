import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogNoticeDetailProxy from "../proxy/DialogNoticeDetailProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogNoticeDetailMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogNoticeDetailProxy = getProxy(DialogNoticeDetailProxy);
 
    }
}