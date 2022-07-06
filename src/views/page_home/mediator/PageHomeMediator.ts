import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageHomeProxy from "../proxy/PageHomeProxy";
import getProxy from "@/core/global/getProxy";
import NotificationName from "@/core/NotificationName";
import GameProxy from "@/proxy/GameProxy";

export default class PageHomeMediator extends AbstractMediator {
    public onRegister(): void {
        const gameProxy: GameProxy = getProxy(GameProxy);
        const myProxy: PageHomeProxy = getProxy(PageHomeProxy);
        myProxy.pageData.lobbyIndex = gameProxy.lobbyIndex;
        myProxy.api_plat_var_stake_info();
        myProxy.api_plat_var_swap_trial();
    }

    public listNotificationInterests(): string[] {
        return [NotificationName.GAME_CONFIG, net.EventType.api_plat_var_lobby_index, net.EventType.api_plat_var_stake_info, net.EventType.api_plat_var_swap_trial];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageHomeProxy = getProxy(PageHomeProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_lobby_index:
                myProxy.setLobbyIndex(body);
                break;
            case net.EventType.api_plat_var_stake_info:
                myProxy.setStakeInfo(body);
                break;
            case net.EventType.api_plat_var_swap_trial:
                myProxy.setTrial(body);
                break;

        }
    }
}
