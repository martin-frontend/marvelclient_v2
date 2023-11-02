import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageCasinoLobbyProxy from "../proxy/PageCasinoLobbyProxy";
import getProxy from "@/core/global/getProxy";

export default class PageCasinoLobbyMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_var_game_all_index, net.EventType.api_plat_var_game_menu];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageCasinoLobbyProxy = getProxy(PageCasinoLobbyProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_game_all_index:
                myProxy.setGameList(body);
                break;
            case net.EventType.api_plat_var_game_menu:
                myProxy.init();
                break;
        }
    }
}
