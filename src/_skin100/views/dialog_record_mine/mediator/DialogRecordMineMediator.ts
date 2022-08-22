import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRecordMineProxy from "../proxy/DialogRecordMineProxy";
import getProxy from "@/core/global/getProxy";
import dialog_record_mine_detail from "@/_skin100/views/dialog_record_mine_detail";
import DialogRecordMineDetailProxy from "@/views/dialog_record_mine_detail/proxy/DialogRecordMineDetailProxy";

export default class DialogRecordMineMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_backwater, net.EventType.api_user_var_backwater_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogRecordMineProxy = getProxy(DialogRecordMineProxy);
        const detailProxy: DialogRecordMineDetailProxy = getProxy(DialogRecordMineDetailProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_backwater:
                myProxy.setData(body);
                break;
            case net.EventType.api_user_var_backwater_var:
                detailProxy.pageData.bShow = true;
                dialog_record_mine_detail.show(body);
                break;
        }
    }
}
