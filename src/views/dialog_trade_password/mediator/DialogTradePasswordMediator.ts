import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogTradePasswordProxy from "../proxy/DialogTradePasswordProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogTradePasswordMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogTradePasswordProxy = getProxy(DialogTradePasswordProxy);
        // switch(notification.getName()){}
    }
}