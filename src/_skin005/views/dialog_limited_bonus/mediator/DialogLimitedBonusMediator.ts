import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogLimitedBonusProxy from "../proxy/DialogLimitedBonusProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogLimitedBonusMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        // const body = notification.getBody();
        // const myProxy:DialogLimitedBonusProxy = getProxy(DialogLimitedBonusProxy);
        // switch(notification.getName()){}
    }
}