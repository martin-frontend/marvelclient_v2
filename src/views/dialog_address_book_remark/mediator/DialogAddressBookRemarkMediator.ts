import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogAddressBookRemarkProxy from "../proxy/DialogAddressBookRemarkProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";

export default class DialogAddressBookRemarkMediator extends AbstractMediator {

    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_payment_method_update_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogAddressBookRemarkProxy = getProxy(DialogAddressBookRemarkProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_payment_method_update_var:
                myProxy.pageData.loading = false;
                myProxy.hide();
                dialog_message.success(LangUtil("操作成功"));
                break;
        }
    }
}