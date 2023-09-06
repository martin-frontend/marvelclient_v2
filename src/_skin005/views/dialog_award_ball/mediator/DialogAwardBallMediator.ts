import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogAwardBallProxy from "../proxy/DialogAwardBallProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogAwardBallMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        // const body = notification.getBody();
        // const myProxy:DialogAwardBallProxy = getProxy(DialogAwardBallProxy);
        // switch(notification.getName()){}
    }
}