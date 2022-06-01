import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageBonusProxy from "../proxy/PageBonusProxy";
import getProxy from "@/core/global/getProxy";

export default class PageBonusMediator extends AbstractMediator {
    private myProxy: PageBonusProxy = this.getProxy(PageBonusProxy);

    protected initViewData(): void {
        this.myProxy.api_plat_var_stake_info()
        this.myProxy.api_user_var_stake_info();
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_var_stake_info,
            net.EventType.api_user_var_stake_info,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageBonusProxy = getProxy(PageBonusProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_stake_info:
                this.myProxy.setPlatData(body);
                break;
        }
    }
}