import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogWalletProxy from "../proxy/DialogWalletProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";

export default class DialogWalletMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_show_var, net.EventType.api_user_var_vendor_withdraw, net.EventType.api_user_show_var_gold];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogWalletProxy = getProxy(DialogWalletProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_show_var:
                myProxy.pageData.loading = false;
                myProxy.pageData.gold_info = body.gold_info;
                break;
            case net.EventType.api_user_var_vendor_withdraw:
                dialog_message.success("提取成功");
                myProxy.api_user_show_var();
                break;
            case net.EventType.api_user_show_var_gold:
                myProxy.pageData.loading = false;
                myProxy.setData(body);
                break;
        }
    }
}
