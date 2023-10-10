import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogAddressBookProxy from "../proxy/DialogAddressBookProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
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
                PanelUtil.message_success(LangUtil("操作成功"));
                break;
        }
    }
}
