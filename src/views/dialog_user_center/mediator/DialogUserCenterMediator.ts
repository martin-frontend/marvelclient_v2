import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogUserCenterProxy from "../proxy/DialogUserCenterProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogUserCenterMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogUserCenterProxy = getProxy(DialogUserCenterProxy);
        // switch(notification.getName()){}
    }
}