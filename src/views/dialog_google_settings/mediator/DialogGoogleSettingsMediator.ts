import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogGoogleSettingsProxy from "../proxy/DialogGoogleSettingsProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogGoogleSettingsMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogGoogleSettingsProxy = getProxy(DialogGoogleSettingsProxy);
        switch(notification.getName()){}
    }
}