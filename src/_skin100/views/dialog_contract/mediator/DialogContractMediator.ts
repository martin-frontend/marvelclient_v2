import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogContractProxy from "../proxy/DialogContractProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogContractMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogContractProxy = getProxy(DialogContractProxy);
    }
}
