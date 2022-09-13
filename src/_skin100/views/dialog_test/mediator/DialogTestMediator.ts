import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogTestProxy from "../proxy/DialogTestProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogTestMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogTestProxy = getProxy(DialogTestProxy);
        switch (notification.getName()) {
        }
    }
}
