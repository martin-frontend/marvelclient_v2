import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogManuallyUnstakingProxy from "../proxy/DialogManuallyUnstakingProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message_box from "@/views/dialog_message_box";

export default class DialogManuallyUnstakingMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_withdraw_stake,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogManuallyUnstakingProxy = getProxy(DialogManuallyUnstakingProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_withdraw_stake:
                dialog_message_box.alert("解除质押数量" + body);
                break;
        }
    }
}