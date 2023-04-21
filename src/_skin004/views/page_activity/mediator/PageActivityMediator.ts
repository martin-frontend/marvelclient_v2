import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageActivityProxy from "../proxy/PageActivityProxy";
import getProxy from "@/core/global/getProxy";

export default class PageActivityMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_activity, core.EventType.REQUEST_ERROR];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageActivityProxy = getProxy(PageActivityProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_activity:
                console.log("--关闭 加载");
                myProxy.setData(body);
                break;
            case net.EventType.REQUEST_ERROR:
                if (body.url == net.HttpType.api_plat_activity) {
                    myProxy.pageData.loading = false;
                }
                break;
        }
    }
}
