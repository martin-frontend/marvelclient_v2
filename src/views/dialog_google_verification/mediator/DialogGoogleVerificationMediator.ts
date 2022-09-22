import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogGoogleVerificationProxy from "../proxy/DialogGoogleVerificationProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogGoogleVerificationMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogGoogleVerificationProxy = getProxy(DialogGoogleVerificationProxy);
        switch(notification.getName()){}
    }
}