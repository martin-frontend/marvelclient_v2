import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPerformanceProxy from "../proxy/DialogPerformanceProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogPerformanceMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogPerformanceProxy = getProxy(DialogPerformanceProxy);
        // switch(notification.getName()){}
    }
}