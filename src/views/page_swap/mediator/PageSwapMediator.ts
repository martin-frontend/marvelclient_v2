import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageSwapProxy from "../proxy/PageSwapProxy";
import getProxy from "@/core/global/getProxy";

export default class PageSwapMediator extends AbstractMediator {
    private myProxy: PageSwapProxy = this.getProxy(PageSwapProxy);

    protected initViewData(): void {
        this.myProxy.api_plat_var_swap_setting_info();
        this.myProxy.api_user_var_swap_trial();
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_var_swap_setting_info,
            net.EventType.api_user_var_swap_trial,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageSwapProxy = getProxy(PageSwapProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_swap_setting_info:
                this.myProxy.setData(body);
                break;
            case net.EventType.api_user_var_swap_trial:
                this.myProxy.setTrial(body);
                break;
        }
    }
}
