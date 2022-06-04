import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPledgeRecordsProxy from "../proxy/DialogPledgeRecordsProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogPledgeRecordsMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_stake_log,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogPledgeRecordsProxy = getProxy(DialogPledgeRecordsProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_stake_log:
                myProxy.setData(body);
                break;
        }
    }
}