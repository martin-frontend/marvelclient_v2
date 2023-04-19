import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogAddressBookProxy from "../proxy/DialogAddressBookProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";
export default class DialogAddressBookMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_exchange_method_list,
            net.EventType.api_user_var_payment_method_index,
            net.EventType.api_user_var_payment_method_update_var,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogAddressBookProxy = getProxy(DialogAddressBookProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_exchange_method_list:
                myProxy.setData(body);
                break;
            case net.EventType.api_user_var_payment_method_index:
                myProxy.pageData.loading = false;
                myProxy.setAdressData(body);
                break;
            case net.EventType.api_user_var_payment_method_update_var:
                myProxy.api_user_var_payment_method_index();
                myProxy.pageData.loading = false;
                dialog_message.success(LangUtil("操作成功"));
                break;
        }
    }
}
