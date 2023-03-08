import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageActivityProxy from "../proxy/PageActivityProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class PageActivityMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_activity];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:PageActivityProxy = getProxy(PageActivityProxy);
        switch(notification.getName()){
            case net.EventType.api_plat_activity:
                console.log("--关闭 加载");
                PanelUtil.showAppLoading(false);
                myProxy.setData(body);
                break;
        }
    }
}