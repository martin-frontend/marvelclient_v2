import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageStatisticeCreditProxy from "../proxy/PageStatisticeCreditProxy";
import getProxy from "@/core/global/getProxy";

export default class PageStatisticeCreditMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:PageStatisticeCreditProxy = getProxy(PageStatisticeCreditProxy);
        // switch(notification.getName()){}
    }
}