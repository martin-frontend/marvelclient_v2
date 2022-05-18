import GameProxy from "@/proxy/GameProxy";
import SelfProxy from "@/proxy/SelfProxy";
import page_game_play from "@/views/page_game_play";
import AbstractMediator from "./abstract/AbstractMediator";
import GamePlatConfig from "./config/GamePlatConfig";
import getProxy from "./global/getProxy";
import NotificationName from "./NotificationName";

export default class NetObserver extends AbstractMediator {
    static NAME = "NetObserver";

    private selfProxy: SelfProxy = getProxy(SelfProxy);
    private gameProxy:GameProxy = getProxy(GameProxy);

    public listNotificationInterests(): string[] {
        return [
            NotificationName.GAME_CONFIG,
            net.EventType.api_user_logout,
            net.EventType.api_plat_var_game_config,
            net.EventType.api_user_show_var,
            net.EventType.api_plat_var_lobby_index,
            net.EventType.api_vendor_var_ori_product_show_var,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        switch (notification.getName()) {
            //系统配置
            case NotificationName.GAME_CONFIG:
                {
                    //获取平台配置信息
                    this.sendNotification(net.HttpType.api_plat_var_game_config, { plat_id: core.plat_id });
                    //获取用户信息
                    this.selfProxy.api_user_show_var([2, 3, 6]);
                    //获取大厅游戏列表
                    this.sendNotification(net.HttpType.api_plat_var_lobby_index, { plat_id: core.plat_id });
                }
                break;
            case net.EventType.api_user_logout:
                this.selfProxy.loginout();
                break;
            //游戏配置
            case net.EventType.api_plat_var_game_config:
                GamePlatConfig.init(body);
                break;
            //用户信息
            case net.EventType.api_user_show_var:
                this.selfProxy.setUserInfo(body);
                break;
            case net.EventType.api_plat_var_lobby_index:
                this.gameProxy.setLobbyIndex(body);
                break;
            case net.EventType.api_vendor_var_ori_product_show_var:
                page_game_play.show(body.url);
                break;
        }
    }
}
