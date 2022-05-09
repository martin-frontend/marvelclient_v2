import AbstractMediator from "@/core/abstract/AbstractMediator";
import GameProxy from "@/proxy/GameProxy";
import WalletProxy from "../proxy/WalletProxy";

interface IHeader {
    setLobbyIndex(data: any): void;
}
export default class HeaderMediator extends AbstractMediator {
    protected initViewData(): void {
        // const myView: IHeader = this.viewComponent;
        // const gameProxy: GameProxy = this.getProxy(GameProxy);
        // myView.setLobbyIndex(gameProxy.lobbyIndex);
    }

    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_show_var, net.EventType.api_plat_var_lobby_index];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myView: IHeader = this.viewComponent;
        switch (notification.getName()) {
            case net.EventType.api_user_show_var:
                {
                    const myProxy:WalletProxy = this.getProxy(WalletProxy);
                    myProxy.setGoldInfo(body.gold_info);
                }
                break;
            case net.EventType.api_plat_var_lobby_index:
                {
                    const gameProxy: GameProxy = this.getProxy(GameProxy);
                    myView.setLobbyIndex(gameProxy.lobbyIndex);
                }
                break;
        }
    }
}
