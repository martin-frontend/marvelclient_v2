import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageHomeProxy from "../proxy/PageHomeProxy";
import getProxy from "@/core/global/getProxy";
import NotificationName from "@/core/NotificationName";

export default class PageHomeMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [NotificationName.GAME_CONFIG, net.EventType.api_plat_var_lobby_index];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageHomeProxy = getProxy(PageHomeProxy);
        switch (notification.getName()) {
            case NotificationName.GAME_CONFIG:
                myProxy.api_plat_var_lobby_index();
                break;
            case net.EventType.api_plat_var_lobby_index:
                myProxy.setLobbyIndex(body);
                break;
        }
    }
}
