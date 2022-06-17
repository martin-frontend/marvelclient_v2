import AbstractMediator from "@/core/abstract/AbstractMediator";
import getProxy from "@/core/global/getProxy";
import Marquee1Proxy from "./Marquee1Proxy";

export default class Marquee1Mediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_var_marquee_index];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: Marquee1Proxy = getProxy(Marquee1Proxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_marquee_index:
                myProxy.setData(body);
                break;
        }
    }
}
