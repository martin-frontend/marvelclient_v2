import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRecordMineProxy from "../proxy/DialogRecordMineProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogRecordMineMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_backwater];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogRecordMineProxy = getProxy(DialogRecordMineProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_backwater:
                myProxy.setData(body);
                break;
        }
    }
}
