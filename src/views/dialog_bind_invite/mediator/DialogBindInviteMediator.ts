import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogBindInviteProxy from "../proxy/DialogBindInviteProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogBindInviteMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogBindInviteProxy = getProxy(DialogBindInviteProxy);
        // switch(notification.getName()){}
    }
}
