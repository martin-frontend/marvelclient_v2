import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPledgeProxy from "../proxy/DialogPledgeProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogPledgeMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogPledgeProxy = getProxy(DialogPledgeProxy);
        // switch(notification.getName()){}
    }
}