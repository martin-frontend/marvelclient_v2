import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogAddressBookRemarkProxy from "../proxy/DialogAddressBookRemarkProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";
import DialogAddressBookProxy from "@/_skin101/views/dialog_address_book/proxy/DialogAddressBookProxy";

export default class DialogAddressBookRemarkMediator extends AbstractMediator {
    private addressBookproxy: DialogAddressBookProxy = getProxy(DialogAddressBookProxy);

    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_payment_method_update_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogAddressBookRemarkProxy = getProxy(DialogAddressBookRemarkProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_payment_method_update_var:
                this.addressBookproxy.api_user_var_exchange_method_list();
                myProxy.pageData.loading = false;
                myProxy.hide();
                dialog_message.success(LangUtil("操作成功"));
                break;
        }
    }
}
