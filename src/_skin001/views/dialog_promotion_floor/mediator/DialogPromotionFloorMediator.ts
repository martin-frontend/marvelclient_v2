import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPromotionFloorProxy from "../proxy/DialogPromotionFloorProxy";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyProxy from "@/_skin001/views/dialog_directly/proxy/DialogDirectlyProxy";

export default class DialogPromotionFloorMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_agent_var_update,
        net.EventType.api_user_var_agent_var_floor_range];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const dialogDirectlyProxy: DialogDirectlyProxy = getProxy(DialogDirectlyProxy);
        const myProxy: DialogPromotionFloorProxy = getProxy(DialogPromotionFloorProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_agent_var_update:
                myProxy.setData(body);
                myProxy.resetData();
                dialogDirectlyProxy.api_user_var_agent_direct_list();
                break;
            case net.EventType.api_user_var_agent_var_floor_range:
                myProxy.setFloorRange(body);
                break;
        }
    }
}
