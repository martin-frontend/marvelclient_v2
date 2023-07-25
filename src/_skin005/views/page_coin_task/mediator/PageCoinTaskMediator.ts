import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageCoinTaskProxy from "../proxy/PageCoinTaskProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class PageCoinTaskMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_coin_task_index, net.EventType.api_user_var_coin_task_cancel];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageCoinTaskProxy = getProxy(PageCoinTaskProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_coin_task_index:
                PanelUtil.showAppLoading(false);
                myProxy.setData(body);
                break;
            case net.EventType.api_user_var_coin_task_cancel:
                PanelUtil.showAppLoading(false);
                myProxy.api_user_var_coin_task_index();
                break;
        }
    }
}
