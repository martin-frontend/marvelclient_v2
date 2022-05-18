import AbstractMediator from "@/core/abstract/AbstractMediator";
import getProxy from "@/core/global/getProxy";
import HeaderProxy from "../proxy/HeaderProxy";

export default class HeaderMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_var_lobby_index
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:HeaderProxy = getProxy(HeaderProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_lobby_index:
                myProxy.setLobbyIndex(body);
                break;
        }
    }
}
