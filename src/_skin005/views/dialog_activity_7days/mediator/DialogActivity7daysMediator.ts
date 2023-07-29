import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogActivity7daysProxy from "../proxy/DialogActivity7daysProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogActivity7daysMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_activity_daily_rewards_var,
            net.EventType.api_plat_activity_daily_rewards_var_receive,
            net.EventType.api_plat_activity_var_rule_id_var,
            net.EventType.api_user_var_recharge_method_list,
            net.EventType.api_user_var_recharge_create,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogActivity7daysProxy = getProxy(DialogActivity7daysProxy);
        if (!myProxy.pageData.bShow) return;
        switch (notification.getName()) {
            case net.EventType.api_plat_activity_daily_rewards_var:
                PanelUtil.showAppLoading(false);
                myProxy.setRechargeActiveData(body);
                break;
            case net.EventType.api_plat_activity_daily_rewards_var_receive:
                PanelUtil.showAppLoading(false);
                myProxy.receive_callback(body);
                break;
            case net.EventType.api_plat_activity_var_rule_id_var:
                myProxy.setFirstChargeCount(body);
                break;
            case net.EventType.api_user_var_recharge_method_list:
                myProxy.onRecharge(body);
                break;
            case net.EventType.api_user_var_recharge_create:
                myProxy.onCreateOrder(body);
                break;
        }
    }
}
