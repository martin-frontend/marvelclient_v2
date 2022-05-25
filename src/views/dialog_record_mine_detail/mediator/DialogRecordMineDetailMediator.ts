import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRecordMineDetailProxy from "../proxy/DialogRecordMineDetailProxy";
import getProxy from "@/core/global/getProxy";
import dialog_record_mine_detail from "../";

export default class DialogRecordMineDetailMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_backwater_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogRecordMineDetailProxy = getProxy(DialogRecordMineDetailProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_backwater_var:
                dialog_record_mine_detail.show();
                myProxy.setData(body);
                break;
        }
    }
}
