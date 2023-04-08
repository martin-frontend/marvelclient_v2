import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageIntroduceProxy from "../proxy/PageIntroduceProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class PageIntroduceMediator extends AbstractMediator {
    onRegister() {
        PanelUtil.showAppLoading(false);
    }

    onRemove() {
        this.facade.removeProxy(PageIntroduceProxy.NAME);
    }

    protected initViewData(): void {
        const myProxy: PageIntroduceProxy = getProxy(PageIntroduceProxy);
        myProxy.api_plat_var_reward_coin_info();
        myProxy.api_plat_var_stake_info();

        PanelUtil.showAppLoading(true);
    }

    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_var_reward_coin_info, net.EventType.api_plat_var_stake_info];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageIntroduceProxy = getProxy(PageIntroduceProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_reward_coin_info:
                PanelUtil.showAppLoading(false);
                myProxy.setRewardCoinInfo(body);
                break;
            case net.EventType.api_plat_var_stake_info:
                PanelUtil.showAppLoading(false);
                myProxy.setStakeInfo(body);
                break;
        }
    }
}
