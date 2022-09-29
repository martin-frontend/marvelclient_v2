import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageGameSoccerProxy from "../proxy/PageGameSoccerProxy";
import getProxy from "@/core/global/getProxy";

export default class PageGameSoccerMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:PageGameSoccerProxy = getProxy(PageGameSoccerProxy);
        // switch(notification.getName()){}
    }
}