import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageExtensionProxy from "../proxy/PageExtensionProxy";
import getProxy from "@/core/global/getProxy";

export default class PageExtensionMediator extends AbstractMediator {
    private myProxy: PageExtensionProxy = this.getProxy(PageExtensionProxy);
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_commission_commissiondetail,
            net.EventType.api_user_var_commission_commissionnum,
            net.EventType.api_user_var_short_chain,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageExtensionProxy = getProxy(PageExtensionProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_commission_commissiondetail:
                this.sendNotification(net.HttpType.api_user_var_short_chain, { user_id: core.user_id });
                this.myProxy.setData(body);
                break;
            case net.EventType.api_user_var_commission_commissionnum:
                this.myProxy.setCommissionCommissionnum(body);
                break;
            case net.EventType.api_user_var_short_chain:
                this.myProxy.setLink(body.url);
                break;
        }
    }
}