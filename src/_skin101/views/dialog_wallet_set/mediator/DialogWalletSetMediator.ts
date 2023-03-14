import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogWalletSetProxy from "../proxy/DialogWalletSetProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogWalletSetMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_block_coins_scale];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogWalletSetProxy = getProxy(DialogWalletSetProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_block_coins_scale:
                myProxy.setData(body);
                break;
        }
    }
}
