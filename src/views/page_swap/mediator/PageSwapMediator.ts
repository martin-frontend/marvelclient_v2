import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageSwapProxy from "../proxy/PageSwapProxy";
import getProxy from "@/core/global/getProxy";

export default class PageSwapMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageSwapProxy = getProxy(PageSwapProxy);
        // switch(notification.getName()){}
    }
}