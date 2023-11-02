import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageCasinoSportProxy from "../proxy/PageCasinoSportProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class PageCasinoSportMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_var_game_all_index, net.EventType.api_plat_var_game_menu];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageCasinoSportProxy = getProxy(PageCasinoSportProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_game_all_index:
                PanelUtil.showAppLoading(false);
                break
            case net.EventType.api_plat_var_game_menu:
                myProxy.init();
                break;
        }
    }
}
