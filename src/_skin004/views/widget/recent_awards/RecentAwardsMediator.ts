import AbstractMediator from "@/core/abstract/AbstractMediator";
import getProxy from "@/core/global/getProxy";
import RecentAwardsProxy from "./RecentAwardsProxy";

export default class RecentAwardsMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_var_plat_big_award];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        console.log("RecentAwards_RecentAwardsMediator>>");
        const myProxy: RecentAwardsProxy = getProxy(RecentAwardsProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_plat_big_award:
                myProxy.setData(body);
                break;
        }
    }
}
