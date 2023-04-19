import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRechargeBankchargeProxy from "../proxy/DialogRechargeBankchargeProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogRechargeBankchargeMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_coin_recharge_confirm];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogRechargeBankchargeProxy = getProxy(DialogRechargeBankchargeProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_coin_recharge_confirm:
                myProxy.set_user_var_coin_recharge_confirm(body);
                break;
        }
    }
}
