import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogOfficialMailProxy from "../proxy/DialogOfficialMailProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogOfficialMailMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogOfficialMailProxy = getProxy(DialogOfficialMailProxy);
        // switch (notification.getName()) {
        // }
    }
}
