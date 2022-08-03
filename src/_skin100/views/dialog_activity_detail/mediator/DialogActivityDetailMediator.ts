import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogActivityDetailProxy from "../proxy/DialogActivityDetailProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogActivityDetailMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogActivityDetailProxy = getProxy(DialogActivityDetailProxy);
        // switch(notification.getName()){}
    }
}
