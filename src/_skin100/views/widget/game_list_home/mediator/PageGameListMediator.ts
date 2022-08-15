import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageGameListProxy from "../proxy/PageGameListProxy";
import getProxy from "@/core/global/getProxy";

export default class PageGameListMediator extends AbstractMediator {
    public onRegister(): void {
        const myProxy: PageGameListProxy = getProxy(PageGameListProxy);
        if (myProxy.config.loaded) {
            myProxy.api_plat_var_game_all_index();
        } else {
            myProxy.api_plat_var_game_all_config();
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
        const myProxy: PageGameListProxy = getProxy(PageGameListProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_lobby_index:
                {
                    for (const item of body.class) {
                        if (item.category == 1) {
                            myProxy.setHotGame(item);
                        }
                        if (item.category == 2) {
                            myProxy.setQpGame(item);
                        }
                        if (item.category == 16) {
                            myProxy.setDzGame(item);
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
