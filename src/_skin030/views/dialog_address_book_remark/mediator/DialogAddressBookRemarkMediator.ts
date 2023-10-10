import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogAddressBookRemarkProxy from "../proxy/DialogAddressBookRemarkProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class DialogAddressBookRemarkMediator extends AbstractMediator {
    private addressBookproxy = PanelUtil.getProxy_addressBook;

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
                PanelUtil.message_success(LangUtil("操作成功"));
                break;
        }
    }
}
