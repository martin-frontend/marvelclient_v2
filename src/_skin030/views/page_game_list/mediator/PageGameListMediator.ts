import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageGameListProxy from "../proxy/PageGameListProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class PageGameListMediator extends AbstractMediator {
    public onRegister(): void {
        PanelUtil.showAppLoading(false);
        const myProxy: PageGameListProxy = getProxy(PageGameListProxy);
        // if (myProxy.config.loaded) {
        //     if (myProxy.pageData.pageInfo.pageCurrent < 2) myProxy.api_plat_var_game_all_index();
        // } else {
        //     myProxy.api_plat_var_game_all_config();
        // }
        //myProxy.api_plat_var_game_menu();
        if (!myProxy._isInit) {
            myProxy.init();
        }
    }

    onRemove() {
        // this.facade.removeProxy(PageGameListProxy.NAME);
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_var_game_all_config,
            net.EventType.api_plat_var_game_all_index,
            net.EventType.api_plat_var_game_menu,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageGameListProxy = getProxy(PageGameListProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_game_all_config:
                myProxy.setConfig(body);
                break;
            case net.EventType.api_plat_var_game_all_index:
                myProxy.setGameList(body);
                break;
            case net.EventType.api_plat_var_game_menu:
                myProxy.init();
                break;
        }
    }
}
