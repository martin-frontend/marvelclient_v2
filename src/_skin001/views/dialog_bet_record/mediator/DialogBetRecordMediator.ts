import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogBetRecordProxy from "../proxy/DialogBetRecordProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message_box from "@/views/dialog_message_box";

export default class DialogBetRecordMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_vendor_simple, net.EventType.api_user_show_var_bet, net.EventType.api_user_var_agent_var_bet];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogBetRecordProxy = getProxy(DialogBetRecordProxy);
        switch (notification.getName()) {
            case net.EventType.api_vendor_simple:
                myProxy.pageData.vendors = body;
                break;
            case net.EventType.api_user_show_var_bet:
                myProxy.setData(body);
                break;
            case net.EventType.api_user_var_agent_var_bet:
                myProxy.setData(body);
                break;
        }
    }
}
