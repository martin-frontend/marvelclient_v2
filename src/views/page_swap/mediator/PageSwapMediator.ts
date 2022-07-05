import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageSwapProxy from "../proxy/PageSwapProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";

export default class PageSwapMediator extends AbstractMediator {
    private myProxy: PageSwapProxy = this.getProxy(PageSwapProxy);
    LangUtil = LangUtil;

    protected initViewData(): void {
        this.myProxy.pageData.timeSelect = 0;
        this.myProxy.resetTrial();
        this.myProxy.api_plat_var_swap_setting_info();
        this.myProxy.api_plat_var_swap_k();
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_var_swap_setting_info,
            net.EventType.api_user_var_swap_trial,
            net.EventType.api_plat_var_swap_k,
            net.EventType.api_user_var_swap_create_order,
            net.EventType.api_user_var_mail_var_receive,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageSwapProxy = getProxy(PageSwapProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_swap_setting_info:
                myProxy.parameter.from_coin = myProxy.pageData.swap_setting_info.coin_a;
                this.myProxy.setData(body);
                this.myProxy.api_user_var_swap_trial();
                break;
            case net.EventType.api_user_var_swap_trial:
                this.myProxy.setTrial(body);
                break;
            case net.EventType.api_plat_var_swap_k:
                this.myProxy.setSwapK(body);
                break;
            case net.EventType.api_user_var_swap_create_order:
                this.myProxy.resetTrial();
                dialog_message.success(LangUtil("交换成功"));
                break;
            case net.EventType.api_user_var_mail_var_receive:

                break;
        }
    }
}
