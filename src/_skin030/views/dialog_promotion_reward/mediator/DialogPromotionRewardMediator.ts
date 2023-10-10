import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPromotionRewardProxy from "../proxy/DialogPromotionRewardProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class DialogPromotionRewardMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_activity,
            net.EventType.api_plat_activity_var,
            net.EventType.api_plat_activity_var_rule_id_var,
            net.EventType.api_plat_activity_var_receive,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogPromotionRewardProxy = getProxy(DialogPromotionRewardProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_activity_var:
                console.log("--收到详情----", body);
                myProxy.setData(body);
                break;
            case net.EventType.api_plat_activity_var_rule_id_var:
                myProxy.setFirstChargeCount(body);
                break;
            case net.EventType.api_plat_activity_var_receive:
                myProxy.setReward(body);
                break;
        }
    }
}
