import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageGameListProxy from "../proxy/PageGameListHomeProxy";
import getProxy from "@/core/global/getProxy";

export default class PageGameListMediator extends AbstractMediator {
    public onRegister(): void {
        const myProxy: PageGameListProxy = getProxy(PageGameListProxy);
        // myProxy.api_plat_var_lobby_index();
        // if (myProxy.config.loaded) {
        //     myProxy.api_plat_var_game_all_index();
        // } else {
        //     myProxy.api_plat_var_game_all_config();
        // }
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_var_lobby_index,
            // net.EventType.api_plat_var_game_all_config,
            // net.EventType.api_plat_var_game_all_index,
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
                        if (item.category == 128) {
                            myProxy.setHXGame(item);
                        }
                        if (item.category == 64) {
                            myProxy.setSportGame(item);
                        }
                        if (item.category == 8) {
                            myProxy.setFishingGame(item);
                        }
                        if (item.category == 32) {
                            myProxy.setRealGame(item);
                        }
                    }
                    myProxy.setloading();
                }
                break;
            // case net.EventType.api_plat_var_game_all_config:
            //     myProxy.setConfig(body);
            //     break;
            // case net.EventType.api_plat_var_game_all_index:
            //     myProxy.setGameList(body);
            //     break;
        }
    }
}
