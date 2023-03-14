import AbstractMediator from "@/core/abstract/AbstractMediator";
import GameSearchProxy from "../proxy/GameSearchProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/_skin101/views/dialog_message";

export default class GameSearchMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_game_search, net.EventType.api_user_var_game_index, net.EventType.api_user_var_game_update_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: GameSearchProxy = getProxy(GameSearchProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_game_search:
                myProxy.setSearchResult(body);
                break;
            case net.EventType.api_user_var_game_index:
                myProxy.setData(body);
                break;
            case net.EventType.api_user_var_game_update_var:
                // dialog_message.success("操作成功");
                break;
        }
    }
}
