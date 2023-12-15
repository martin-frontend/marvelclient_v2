import getProxy from "@/core/global/getProxy";
import LotteryListProxy from "./LotteryListProxy";

export default class LotteryListMediator extends puremvc.Mediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_vendor_267_products];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: LotteryListProxy = getProxy(LotteryListProxy);
        switch (notification.getName()) {
            case net.EventType.api_vendor_267_products:
                myProxy.set_vendor_267_products(body);
                break;
        }
    }
}
