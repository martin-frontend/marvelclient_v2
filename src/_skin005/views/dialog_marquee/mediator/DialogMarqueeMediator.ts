import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogMarqueeProxy from "../proxy/DialogMarqueeProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogMarqueeMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        // const body = notification.getBody();
        // const myProxy:DialogMarqueeProxy = getProxy(DialogMarqueeProxy);
        // switch(notification.getName()){}
    }
}