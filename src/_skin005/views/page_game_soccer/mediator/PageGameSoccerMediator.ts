import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageGameSoccerProxy from "../proxy/PageGameSoccerProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import NotificationName from "@/core/NotificationName";
import GameProxy from "@/proxy/GameProxy";
import GameConfig from "@/core/config/GameConfig";

export default class PageGameSoccerMediator extends AbstractMediator {
    onRegister() {
        PanelUtil.showAppLoading(false);
    }

    onRemove() {
        this.facade.removeProxy(PageGameSoccerProxy.NAME);
    }

    public listNotificationInterests(): string[] {
        return [
            NotificationName.UPDATE_COIN,
            NotificationName.GO_HOME,
            net.EventType.api_vendor_var_ori_product_show_var,
            net.EventType.api_vendor_var_ori_product_visitor_show_var,
            net.EventType.REQUEST_ERROR,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageGameSoccerProxy = getProxy(PageGameSoccerProxy);
        const gameProxy: GameProxy = getProxy(GameProxy);
        switch (notification.getName()) {
            case NotificationName.UPDATE_COIN:
                {
                    if (gameProxy.currGame.vendor_id == GameConfig.config.CricketVendorId) {
                        PanelUtil.openpage_soccer_cricket();
                    } else {
                        myProxy.refreshGame();
                    }
                }

                break;
            case NotificationName.GO_HOME:
                PanelUtil.openpage_home();
                break;
            case net.EventType.api_vendor_var_ori_product_visitor_show_var:
            case net.EventType.api_vendor_var_ori_product_show_var:
                myProxy.pageData.token = body.token;
                break;
            case net.EventType.REQUEST_ERROR:
                console.log("接收错误消息");
                if (
                    body.url == net.getUrl(net.HttpType.api_vendor_var_ori_product_show_var, body.data) ||
                    body.url == net.getUrl(net.HttpType.api_vendor_var_ori_product_visitor_show_var, body.data)
                ) {
                    PanelUtil.openpage_home();
                }
                break;
        }
    }
}
