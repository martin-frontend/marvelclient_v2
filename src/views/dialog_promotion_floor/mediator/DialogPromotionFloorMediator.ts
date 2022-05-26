import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPromotionFloorProxy from "../proxy/DialogPromotionFloorProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogPromotionFloorMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_agent_var_update];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogPromotionFloorProxy = getProxy(DialogPromotionFloorProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_agent_var_update:
                myProxy.setData(body);
                break;
        }
    }
}