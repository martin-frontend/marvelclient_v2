import GameProxy from "@/proxy/GameProxy";
import SelfProxy from "@/proxy/SelfProxy";
import { GetVerityProxy } from "@/views/common/proxy/GetVerityProxy";
import Message from "@/views/common/proxy/MessageProxy";
import AbstractMediator from "./abstract/AbstractMediator";
import GamePlatConfig from "./config/GamePlatConfig";
import NotificationName from "./NotificationName";

export default class NetObserver extends AbstractMediator {
    static NAME = "NetObserver";

    private selfProxy: SelfProxy = <any>this.facade.retrieveProxy(SelfProxy.NAME);
    private gameProxy: GameProxy = <any>this.facade.retrieveProxy(GameProxy.NAME);

    public listNotificationInterests(): string[] {
        return [
            NotificationName.GAME_CONFIG,
            net.EventType.api_user_logout,
            net.EventType.api_plat_var_game_config,
            net.EventType.api_user_show_var,
            net.EventType.api_plat_var_lobby_index,
            net.EventType.api_vendor_simple,
            net.EventType.api_public_auth_code,
            net.EventType.api_public_email_send,
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
                    this.gameProxy.api_plat_var_lobby_index();
                    this.gameProxy.api_vendor_simple();
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
            //大厅菜单
            case net.EventType.api_plat_var_lobby_index:
                this.gameProxy.setLobbyIndex(body);
                break;
            case net.EventType.api_vendor_simple:
                // this.gameProxy.setLobbyIndex(body);
                break;
            case net.EventType.api_public_auth_code:
                {
                    const getVerityPy:GetVerityProxy = this.getProxy(GetVerityProxy);
                    getVerityPy.auth_image = body;
                }
                break;
            case net.EventType.api_public_email_send:
                {
                    Message.show("发送成功");
                    const getVerityPy:GetVerityProxy = this.getProxy(GetVerityProxy);
                    getVerityPy.dialogData.bShow = false;
                }
                break;
        }
    }
}
