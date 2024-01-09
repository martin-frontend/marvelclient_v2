import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageLossCommissionProxy from "../proxy/PageLossCommissionProxy";
import getProxy from "@/core/global/getProxy";

export default class PageLossCommissionMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_direct_commission_detail,
            net.EventType.api_user_var_direct_commission_index,
            net.EventType.api_user_var_direct_commission_direct_index,
            net.EventType.api_user_var_direct_commission_bonus_index,
            net.EventType.api_user_var_short_chain,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageLossCommissionProxy = getProxy(PageLossCommissionProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_direct_commission_detail:
                myProxy.set_user_var_direct_commission_detail(body);
                break;
            case net.EventType.api_user_var_direct_commission_index:
                myProxy.set_user_var_direct_commission_index(body);
                break;
            case net.EventType.api_user_var_direct_commission_direct_index:
                myProxy.set_user_var_direct_commission_direct_index(body);
                break;
            case net.EventType.api_user_var_direct_commission_bonus_index:
                myProxy.set_user_var_direct_commission_bonus_index(body);
                break;
            case net.EventType.api_user_var_short_chain:
                myProxy.set_user_var_short_chain(body);
                break;
        }
    }
}
