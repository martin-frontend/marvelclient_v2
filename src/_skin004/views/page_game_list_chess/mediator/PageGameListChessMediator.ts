import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageGameListChessProxy from "../proxy/PageGameListChessProxy";
import getProxy from "@/core/global/getProxy";

export default class PageGameListChessMediator extends AbstractMediator {
    public onRegister(): void {
        const myProxy: PageGameListChessProxy = getProxy(PageGameListChessProxy);
        if (myProxy.config.loaded) {
            if (myProxy.pageData.pageInfo.pageCurrent < 2) myProxy.api_plat_var_game_all_index();
        } else {
            myProxy.api_plat_var_game_all_config();
        }
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_var_game_all_config,
            net.EventType.api_plat_var_game_all_index,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageGameListChessProxy = getProxy(PageGameListChessProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_game_all_config:
                myProxy.setConfig(body);
                break;
            case net.EventType.api_plat_var_game_all_index:
                myProxy.setGameList(body);
                break;
        }
    }
}
