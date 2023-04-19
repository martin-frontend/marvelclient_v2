import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogGoldWaterProxy from "../proxy/DialogGoldWaterProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogGoldWaterMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_gold_water_index];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogGoldWaterProxy = getProxy(DialogGoldWaterProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_gold_water_index:
                myProxy.setData(body);
                break;
        }
    }
}
