import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRecordMineProxy from "../proxy/DialogRecordMineProxy";
import getProxy from "@/core/global/getProxy";
import dialog_record_mine_detail from "@/views/dialog_record_mine_detail";
import DialogRecordMineDetailProxy from "@/views/dialog_record_mine_detail/proxy/DialogRecordMineDetailProxy";

export default class DialogRecordMineMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_backwater, net.EventType.api_user_var_backwater_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogRecordMineProxy = getProxy(DialogRecordMineProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_backwater:
                myProxy.setData(body);
                break;
            case net.EventType.api_user_var_backwater_var:
                const proxy: DialogRecordMineDetailProxy = getProxy(DialogRecordMineDetailProxy);
                proxy.pageData.bShow = true;
                dialog_record_mine_detail.show(body);
                break;
        }
    }
}
