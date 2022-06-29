import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogNickNameProxy from "../proxy/DialogNickNameProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogNickNameMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogNickNameProxy = getProxy(DialogNickNameProxy);
        // switch(notification.getName()){}
    }
}