import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageSwapProxy from "../proxy/PageSwapProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";
import SelfProxy from "@/proxy/SelfProxy";
import GameProxy from "@/proxy/GameProxy";

export default class PageSwapMediator extends AbstractMediator {
    private myProxy: PageSwapProxy = this.getProxy(PageSwapProxy);
    LangUtil = LangUtil;
    private selfProxy: SelfProxy = getProxy(SelfProxy);

    protected initViewData(): void {
        this.myProxy.pageData.timeSelect = 0;
        this.myProxy.resetTrial();
        this.myProxy.api_plat_var_swap_setting_info();
        this.myProxy.api_plat_var_swap_k();
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_var_swap_setting_info,
            net.EventType.api_plat_var_swap_trial,
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
                myProxy.setData(body);
                myProxy.api_plat_var_swap_trial();
                break;
            case net.EventType.api_plat_var_swap_trial:
                myProxy.setTrial(body);
                break;
            case net.EventType.api_plat_var_swap_k:
                myProxy.setSwapK(body);
                break;
            case net.EventType.api_user_var_swap_create_order:
                {
                    const gameProxy: GameProxy = getProxy(GameProxy);
                    gameProxy.loading = false;

                    myProxy.resetTrial();
                    dialog_message.success(LangUtil("交换成功"));
                    this.selfProxy.api_user_show_var([2]);
                    myProxy.parameter.from_coin = myProxy.pageData.swap_setting_info.coin_a;
                    myProxy.parameter.from_coin_number = "1";
                    myProxy.pageData.inputType = "";
                    myProxy.api_plat_var_swap_trial();
                }

                break;
            case net.EventType.api_user_var_mail_var_receive:
                break;
        }
    }
}
