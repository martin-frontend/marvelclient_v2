import GameProxy from "@/proxy/GameProxy";
import NoticeProxy from "@/proxy/NoticeProxy";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_message_box from "@/views/dialog_message_box";
import page_game_play from "@/views/page_game_play";
import AbstractMediator from "./abstract/AbstractMediator";
import GamePlatConfig from "./config/GamePlatConfig";
import getProxy from "./global/getProxy";
import NotificationName from "./NotificationName";

import Vue from "vue";
import App from "@/App.vue";
import { vuetify } from "@/plugins/vuetify";
import router from "@/router";
import Cookies from "js-cookie";
import LangConfig from "./config/LangConfig";

export default class NetObserver extends AbstractMediator {
    static NAME = "NetObserver";

    private selfProxy: SelfProxy = getProxy(SelfProxy);
    private gameProxy: GameProxy = getProxy(GameProxy);

    public listNotificationInterests(): string[] {
        return [
            NotificationName.GAME_CONFIG,
            NotificationName.LANG_CONFIG,
            net.EventType.api_user_logout,
            net.EventType.api_plat_var_game_config,
            net.EventType.api_user_show_var,
            net.EventType.api_plat_var_lobby_index,
            net.EventType.api_vendor_var_ori_product_show_var,
            net.EventType.api_plat_var_notice_index,
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
                    //公告
                    this.sendNotification(net.HttpType.api_plat_var_notice_index, { plat_id: core.plat_id });
                }
                break;
            case NotificationName.LANG_CONFIG:
                {
                    //@ts-ignore
                    window["vm"].$mount("#app");
                }
                break;
            case net.EventType.api_user_logout:
                this.selfProxy.loginout();
                dialog_message_box.alert("您的帐号已经退出");
                break;
            //游戏配置
            case net.EventType.api_plat_var_game_config:
                {
                    GamePlatConfig.init(body);
                    //确定语言
                    const userLang = Cookies.get("lang");
                    if (userLang) {
                        core.lang = userLang;
                    } else {
                        const sysLang = navigator.language.replace("-", "_");
                        if (GamePlatConfig.config.language[sysLang]) {
                            core.lang = sysLang;
                        } else {
                            core.lang = GamePlatConfig.config.main_language;
                        }
                    }
                    LangConfig.load();
                }
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
            case net.EventType.api_plat_var_notice_index:
                {
                    const noticeProxy: NoticeProxy = getProxy(NoticeProxy);
                    noticeProxy.setData(body);
                }
                break;
        }
    }
}
