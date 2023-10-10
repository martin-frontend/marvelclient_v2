import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageMyInfoProxy from "../proxy/PageMyInfoProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class PageMyInfoMediator extends AbstractMediator {
    onRegister() {
        PanelUtil.showAppLoading(false);
    }

    onRemove() {
        this.facade.removeProxy(PageMyInfoProxy.NAME);
    }

    protected initViewData(): void {
        PanelUtil.getProxy_selfproxy.api_user_show_var([3, 4, 5, 6]);
    }
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_show_var, net.EventType.api_user_var_block_coins_scale];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageMyInfoProxy = getProxy(PageMyInfoProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_show_var:
                myProxy.pageInit(body);
                break;
            case net.EventType.api_user_var_block_coins_scale:
                myProxy.setCoinsScale(body);
                break;
        }
    }
}
