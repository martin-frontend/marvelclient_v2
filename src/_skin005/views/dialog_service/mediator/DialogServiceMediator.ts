import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogServiceProxy from "../proxy/DialogServiceProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogServiceMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogServiceProxy = getProxy(DialogServiceProxy);
    }
}
