import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageGamePlayProxy from "../proxy/PageGamePlayProxy";
import getProxy from "@/core/global/getProxy";

export default class PageGamePlayMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:PageGamePlayProxy = getProxy(PageGamePlayProxy);
        // switch(notification.getName()){}
    }
}