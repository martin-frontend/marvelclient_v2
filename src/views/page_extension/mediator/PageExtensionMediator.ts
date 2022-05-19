import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageExtensionProxy from "../proxy/PageExtensionProxy";
import getProxy from "@/core/global/getProxy";

export default class PageExtensionMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:PageExtensionProxy = getProxy(PageExtensionProxy);
        switch(notification.getName()){}
    }
}