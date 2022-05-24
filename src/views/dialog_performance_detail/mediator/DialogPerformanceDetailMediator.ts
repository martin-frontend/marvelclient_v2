import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPerformanceDetailProxy from "../proxy/DialogPerformanceDetailProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogPerformanceDetailMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogPerformanceDetailProxy = getProxy(DialogPerformanceDetailProxy);
        // switch(notification.getName()){}
    }
}