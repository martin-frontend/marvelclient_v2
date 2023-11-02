import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogSwapRecordProxy from "../proxy/DialogSwapRecordProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogSwapRecordMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_swap_order_list];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogSwapRecordProxy = getProxy(DialogSwapRecordProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_swap_order_list:
                myProxy.pageData.loading = false;
                myProxy.setData(body);
                break;
        }
    }
}
