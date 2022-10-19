import AbstractMediator from "@/core/abstract/AbstractMediator";
import HeaderMobileProxy from "../proxy/HeaderMobileProxy";
import getProxy from "@/core/global/getProxy";

export default class HeaderMobileMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:HeaderMobileProxy = getProxy(HeaderMobileProxy);
        // switch(notification.getName()){}
    }
}