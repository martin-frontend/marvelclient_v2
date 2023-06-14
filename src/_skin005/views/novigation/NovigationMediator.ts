import AbstractMediator from "@/core/abstract/AbstractMediator";
import NovigationProxy from "./NovigationProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class NovigationMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_activity];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: NovigationProxy = getProxy(NovigationProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_activity:
                myProxy.setActivityData(body);
                break;
        }
    }
}
