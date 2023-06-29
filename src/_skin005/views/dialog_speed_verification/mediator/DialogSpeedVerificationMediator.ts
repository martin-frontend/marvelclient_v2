import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogSpeedVerificationProxy from "../proxy/DialogSpeedVerificationProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogSpeedVerificationMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogSpeedVerificationProxy = getProxy(DialogSpeedVerificationProxy);
        // switch(notification.getName()){}
    }
}