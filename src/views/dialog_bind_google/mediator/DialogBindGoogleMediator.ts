import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogBindGoogleProxy from "../proxy/DialogBindGoogleProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogBindGoogleMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogBindGoogleProxy = getProxy(DialogBindGoogleProxy);
        switch(notification.getName()){}
    }
}