import AbstractMediator from "@/core/abstract/AbstractMediator";
import GameProxy from "@/proxy/GameProxy";
import GameListProxy from "../proxy/GameListProxy";

export default class GameListMediator extends AbstractMediator {
    protected initViewData(): void {
        const gameProxy: GameProxy = this.getProxy(GameProxy);
        const myProxy: GameListProxy = this.getProxy(GameListProxy);
        for (const item of gameProxy.lobbyIndex) {
            if (item.category == 1) {
                myProxy.setHotGame(item);
            }
        }
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_var_lobby_index,
            net.EventType.api_plat_var_game_all_config,
            net.EventType.api_plat_var_game_all_index,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: GameListProxy = this.getProxy(GameListProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_lobby_index:
                {
                    for (const item of body.class) {
                        if (item.category == 1) {
                            myProxy.setHotGame(item);
                        }
                    }
                }
                break;
            case net.EventType.api_plat_var_game_all_config:
                myProxy.setConfig(body);
                break;
            case net.EventType.api_plat_var_game_all_index:
                myProxy.setGameList(body);
                break;
        }
    }
}
