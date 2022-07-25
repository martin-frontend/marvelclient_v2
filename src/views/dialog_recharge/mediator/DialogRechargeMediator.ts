import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRechargeProxy from "../proxy/DialogRechargeProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";
import DialogAddressBookProxy from "@/views/dialog_address_book/proxy/DialogAddressBookProxy";
import OpenLink from "@/core/global/OpenLink";
import dialog_message_box from "@/views/dialog_message_box";
import WebViewBridge from "@/core/native/WebViewBridge";
import SelfProxy from "@/proxy/SelfProxy";

export default class DialogRechargeMediator extends AbstractMediator {
    private selfProxy: SelfProxy = getProxy(SelfProxy);

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_recharge_method_list,
            net.EventType.api_user_var_recharge_address,
            net.EventType.api_user_show_var,
            net.EventType.api_user_var_exchange_method_list,
            net.EventType.api_user_var_exchange_create_order,
            net.EventType.api_user_var_recharge_create,
            net.EventType.api_user_var_gold_transfer,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
        const addressBookProxy: DialogAddressBookProxy = getProxy(DialogAddressBookProxy);
        myProxy.exchangeProxy.pageData.loading = false;
        myProxy.rechargeProxy.pageData.loading = false;
        myProxy.transferProxy.pageData.loading = false;
        switch (notification.getName()) {
            case net.EventType.api_user_var_recharge_method_list:
                myProxy.rechargeProxy.setData(body);
                break;
            case net.EventType.api_user_var_recharge_address:
                myProxy.rechargeProxy.setAddress(body);
                break;
            case net.EventType.api_user_show_var:
                myProxy.exchangeProxy.gold_info = body.gold_info;
                myProxy.transferProxy.gold_info = body.gold_info;
                break;
            case net.EventType.api_user_var_exchange_method_list:
                addressBookProxy.setData(body);
                myProxy.exchangeProxy.setData(body);
                myProxy.transferProxy.setData(body);
                break;
            case net.EventType.api_user_var_exchange_create_order:
                myProxy.pageData.bShow = false;
                dialog_message.success(LangUtil("创建成功"));
                break;
            case net.EventType.api_user_var_recharge_create:
                dialog_message_box.alert({
                    message: LangUtil("点击进入充值通道"),
                    okFun: () => {
                        if (core.app_type == core.EnumAppType.WEB) {
                            OpenLink(body);
                        } else {
                            WebViewBridge.getInstance().openStstemBrowser(body);
                        }
                    },
                });
                break;
            case net.EventType.api_user_var_gold_transfer:
                this.selfProxy.api_user_show_var([2]);
                myProxy.transferProxy.resetform();
                dialog_message.success(LangUtil("划转成功"));
                break;
        }
    }
}
