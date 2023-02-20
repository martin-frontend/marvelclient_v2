import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogEditRemarkProxy from "../proxy/DialogEditRemarkProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogEditRemarkMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogEditRemarkProxy = getProxy(DialogEditRemarkProxy);
    }
}
