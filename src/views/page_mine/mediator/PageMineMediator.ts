import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageMineProxy from "../proxy/PageMineProxy";
import getProxy from "@/core/global/getProxy";

export default class PageMineMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_show_var, net.EventType.api_user_var_backwater_trial];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageMineProxy = getProxy(PageMineProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_show_var:
                myProxy.pageInit(body);
                break;
            case net.EventType.api_user_var_backwater_trial:
                myProxy.setTrial(body);
                break;
        }
    }
}
