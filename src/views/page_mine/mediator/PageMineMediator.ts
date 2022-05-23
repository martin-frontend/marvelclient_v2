import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageMineProxy from "../proxy/PageMineProxy";
import getProxy from "@/core/global/getProxy";

export default class PageMineMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageMineProxy = getProxy(PageMineProxy);
        // switch(notification.getName()){}
    }
}
