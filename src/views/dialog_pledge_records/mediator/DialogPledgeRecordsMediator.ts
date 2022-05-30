import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPledgeRecordsProxy from "../proxy/DialogPledgeRecordsProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogPledgeRecordsMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogPledgeRecordsProxy = getProxy(DialogPledgeRecordsProxy);
        // switch(notification.getName()){}
    }
}