import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlyProxy from "../proxy/DialogDirectlyProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogDirectlyMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogDirectlyProxy = getProxy(DialogDirectlyProxy);
        // switch(notification.getName()){}
    }
}