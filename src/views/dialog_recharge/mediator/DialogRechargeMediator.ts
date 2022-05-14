import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRechargeProxy from "../proxy/DialogRechargeProxy";
import getProxy from "@/core/global/getProxy";
import Message from "@/views/common/proxy/MessageProxy";

export default class DialogRechargeMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_recharge_method_list,
            net.EventType.api_user_var_recharge_address,
            net.EventType.api_user_show_var,
            net.EventType.api_user_var_exchange_method_list,
            net.EventType.api_user_var_exchange_create_order,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_recharge_method_list:
                myProxy.rechargeProxy.setData(body);
                break;
            case net.EventType.api_user_var_recharge_address:
                myProxy.rechargeProxy.setAddress(body);
                break;
            case net.EventType.api_user_show_var:
                myProxy.exchangeProxy.gold_info = body.gold_info;
                // Object.assign(myProxy.exchangeProxy.gold_info, body.gold_info)
                break;
            case net.EventType.api_user_var_exchange_method_list:
                myProxy.exchangeProxy.setData(body);
                break;
            case net.EventType.api_user_var_exchange_create_order:
                Message.show("创建成功");
                break;
        }
    }
}
