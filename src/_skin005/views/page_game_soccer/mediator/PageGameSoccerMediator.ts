import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageGameSoccerProxy from "../proxy/PageGameSoccerProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import NotificationName from "@/core/NotificationName";

export default class PageGameSoccerMediator extends AbstractMediator {
    onRegister() {
        PanelUtil.showAppLoading(false);
    }

    onRemove() {
        this.facade.removeProxy(PageGameSoccerProxy.NAME);
    }

    public listNotificationInterests(): string[] {
        return [NotificationName.UPDATE_COIN, net.EventType.api_vendor_var_ori_product_show_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageGameSoccerProxy = getProxy(PageGameSoccerProxy);
        switch (notification.getName()) {
            case NotificationName.UPDATE_COIN:
                PanelUtil.openpage_soccer_cricket();
                break;
            case net.EventType.api_vendor_var_ori_product_show_var:
                myProxy.pageData.token = body.token;
                break;
        }
    }
}
