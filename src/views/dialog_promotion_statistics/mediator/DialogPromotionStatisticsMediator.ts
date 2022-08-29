import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPromotionStatisticsProxy from "../proxy/DialogPromotionStatisticsProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogPromotionStatisticsMediator extends AbstractMediator{
    private myProxy: DialogPromotionStatisticsProxy = this.getProxy(DialogPromotionStatisticsProxy);

    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogPromotionStatisticsProxy = getProxy(DialogPromotionStatisticsProxy);
        switch(notification.getName()){
            case net.EventType.api_user_var_agent_var_floor_range:
                // myProxy.setFloorRange(body);
                break;
        }
    }
}