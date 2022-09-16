import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogGameRateProxy from "../proxy/DialogGameRateProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogGameRateMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_block_coins_scale];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogGameRateProxy = getProxy(DialogGameRateProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_block_coins_scale:
                myProxy.setData(body);
                break;
        }
    }
}
