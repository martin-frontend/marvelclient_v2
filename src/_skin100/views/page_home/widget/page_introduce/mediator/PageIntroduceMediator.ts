import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageIntroduceProxy from "../proxy/PageIntroduceProxy";
import getProxy from "@/core/global/getProxy";

export default class PageIntroduceMediator extends AbstractMediator {
    protected initViewData(): void {
        const myProxy: PageIntroduceProxy = getProxy(PageIntroduceProxy);
        myProxy.api_plat_var_reward_coin_info();
    }

    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_var_reward_coin_info];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageIntroduceProxy = getProxy(PageIntroduceProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_reward_coin_info:
                myProxy.setRewardCoinInfo(body);
                break;
        }
    }
}
