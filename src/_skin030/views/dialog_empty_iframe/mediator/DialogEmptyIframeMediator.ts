import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogEmptyIframeProxy from "../proxy/DialogEmptyIframeProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogEmptyIframeMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        // const body = notification.getBody();
        // const myProxy:DialogEmptyIframeProxy = getProxy(DialogEmptyIframeProxy);
        // switch(notification.getName()){}
    }
}
