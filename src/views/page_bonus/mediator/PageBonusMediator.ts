import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageBonusProxy from "../proxy/PageBonusProxy";
import getProxy from "@/core/global/getProxy";

export default class PageBonusMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageBonusProxy = getProxy(PageBonusProxy);
        // switch(notification.getName()){}
    }
}