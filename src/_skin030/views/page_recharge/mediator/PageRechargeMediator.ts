import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageRechargeProxy from "../proxy/PageRechargeProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import WebViewBridge from "@/core/native/WebViewBridge";

export default class PageRechargeMediator extends AbstractMediator {
    private selfProxy = PanelUtil.getProxy_selfproxy;

    onRegister() {
        PanelUtil.showAppLoading(false);
        const myProxy: PageRechargeProxy = getProxy(PageRechargeProxy);
        myProxy.exchangeProxy.gold_info = this.selfProxy.userInfo.gold_info;
        myProxy.transferProxy.gold_info = this.selfProxy.userInfo.gold_info;
        myProxy.init();
    }

    onRemove() {
        this.facade.removeProxy(PageRechargeProxy.NAME);
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_recharge_method_list,
            net.EventType.api_user_var_recharge_address,
            net.EventType.api_user_show_var,
            net.EventType.api_user_var_exchange_method_list,
            net.EventType.api_user_var_exchange_create_order,
            net.EventType.api_user_var_recharge_create,
            net.EventType.api_user_var_gold_transfer,
            net.EventType.api_user_var_exchange_extend_info,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageRechargeProxy = getProxy(PageRechargeProxy);
        const addressBookProxy = PanelUtil.getProxy_addressBook;
        // myProxy.exchangeProxy.pageData.loading = false;
        // myProxy.rechargeProxy.pageData.loading = false;
        // myProxy.transferProxy.pageData.loading = false;
        switch (notification.getName()) {
            case net.EventType.api_user_var_recharge_method_list:
                //console.log("----接收消息--api_user_var_recharge_method_list----");
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
                PanelUtil.showAppLoading(false);
                addressBookProxy.setData(body);
                myProxy.exchangeProxy.setData(body);
                myProxy.transferProxy.setData(body);
                break;
            case net.EventType.api_user_var_exchange_create_order:
                myProxy.pageData.bShow = false;
                PanelUtil.showAppLoading(false);
                MultDialogManager.onClosePanel();
                PanelUtil.message_success(LangUtil("创建成功"));
                myProxy.exchangeProxy.init();
                myProxy.exchangeProxy.resetform();
                break;
            case net.EventType.api_user_var_recharge_create:
                PanelUtil.showAppLoading(false);
                myProxy.onCreateOrder(body);
                break;
            case net.EventType.api_user_var_gold_transfer:
                PanelUtil.showAppLoading(false);
                this.selfProxy.api_user_show_var([2]);
                myProxy.transferProxy.resetform();
                PanelUtil.message_success(LangUtil("划转成功"));
                break;
            case net.EventType.api_user_var_exchange_extend_info:
                Object.assign(myProxy.exchangeProxy.extend_info, {
                    ...body,
                });
                break;
        }
    }
}
