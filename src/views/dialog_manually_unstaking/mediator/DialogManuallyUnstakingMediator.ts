import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogManuallyUnstakingProxy from "../proxy/DialogManuallyUnstakingProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogManuallyUnstakingMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogManuallyUnstakingProxy = getProxy(DialogManuallyUnstakingProxy);
        // switch(notification.getName()){}
    }
}