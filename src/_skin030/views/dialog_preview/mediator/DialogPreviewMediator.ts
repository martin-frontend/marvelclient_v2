import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPreviewProxy from "../proxy/DialogPreviewProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogPreviewMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogPreviewProxy = getProxy(DialogPreviewProxy);
        // switch(notification.getName()){}
    }
}
