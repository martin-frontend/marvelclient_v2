import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogAwardProxy from "../proxy/DialogAwardProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogAwardMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogAwardProxy = getProxy(DialogAwardProxy);
        // switch(notification.getName()){}
    }
}
