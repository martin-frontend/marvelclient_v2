import GameProxy from "@/proxy/GameProxy";
import NoticeProxy from "@/proxy/NoticeProxy";
import SelfProxy from "@/proxy/SelfProxy";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import getProxy from "@/core/global/getProxy";
import NotificationName from "@/core/NotificationName";
import FagProxy from "@/proxy/FagProxy";

import router from "@/router";
import LangConfig from "@/core/config/LangConfig";
import LangUtil from "@/core/global/LangUtil";
import { locale } from "vuejs-loadmore";
import WebViewBridge from "@/core/native/WebViewBridge";
import { judgeClient } from "@/core/global/Functions";
import OpenLink from "@/core/global/OpenLink";
import dialog_message_box from "@/views/dialog_message_box";
import page_game_play from "@/_skin001/views/page_game_play";
import page_game_soccer from "../views/page_game_soccer";

export default class NetObserver extends AbstractMediator {
    static NAME = "NetObserver";

    private selfProxy: SelfProxy = getProxy(SelfProxy);
    private gameProxy: GameProxy = getProxy(GameProxy);

    public listNotificationInterests(): string[] {
        return [
            NotificationName.GAME_CONFIG,
            NotificationName.LANG_CONFIG,
            net.EventType.api_user_logout,
            net.EventType.api_plat_var_language_config,
            net.EventType.api_plat_var_game_config,
            net.EventType.api_user_show_var,
            net.EventType.api_plat_var_lobby_index,
            net.EventType.api_vendor_var_ori_product_show_var,
            net.EventType.api_plat_var_notice_index,
            net.EventType.api_plat_fag_index,
            net.EventType.api_user_var_red_dot_tips,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        switch (notification.getName()) {
            //系统配置
            case NotificationName.GAME_CONFIG:
                //获取语言配置
                this.sendNotification(net.HttpType.api_plat_var_language_config, { plat_id: core.plat_id });

                break;
            case net.EventType.api_plat_var_language_config:
                {
                    LangConfig.language = body.language;
                    LangConfig.main_language = body.main_language;
                    //确定语言
                    const userLang = window.localStorage.getItem("lang");
                    if (userLang) {
                        core.lang = userLang;
                    } else {
                        //@ts-ignore
                        const sysLang = (navigator.browserLanguage || navigator.language).replace("-", "_");
                        if (LangConfig.language[sysLang]) {
                            core.lang = sysLang;
                        } else {
                            core.lang = LangConfig.main_language;
                        }
                    }
                    locale.use(core.lang);
                    //获取平台配置信息
                    this.sendNotification(net.HttpType.api_plat_var_game_config, { plat_id: core.plat_id });
                }
                break;
            //游戏配置
            case net.EventType.api_plat_var_game_config:
                GamePlatConfig.init(body);
                LangConfig.load();
                break;
            case NotificationName.LANG_CONFIG:
                {
                    //@ts-ignore
                    window["vm"].$mount("#app");

                    //获取用户信息
                    this.selfProxy.api_user_show_var([2, 3, 6]);
                    //获取大厅游戏列表
                    this.gameProxy.api_plat_var_lobby_index();

                    if (core.app_type == core.EnumAppType.APP) {
                        WebViewBridge.getInstance().enterHall();
                    }
                }
                break;
            case net.EventType.api_user_logout:
                this.selfProxy.loginout();
                dialog_message_box.alert(LangUtil("您的帐号已经退出"));
                break;
            //用户信息
            case net.EventType.api_user_show_var:
                this.selfProxy.setUserInfo(body);
                break;
            case net.EventType.api_plat_var_lobby_index:
                this.gameProxy.setLobbyIndex(body);
                break;
            case net.EventType.api_vendor_var_ori_product_show_var:
                {
                    this.gameProxy.loading = false;
                    // 如果是体育，直接进入
                    if(this.gameProxy.currGame.vendor_id == 96 && this.gameProxy.currGame.ori_product_id == 1){
                        page_game_soccer.show(body.url);
                        return;
                    }

                    dialog_message_box.confirm({
                        message: LangUtil("进入游戏"),
                        okFun: () => {
                            if (core.app_type == core.EnumAppType.WEB) {
                                this.gameProxy.gamePreData.lastRouter = router.currentRoute.path;
                                this.gameProxy.gamePreData.historyLength = window.history.length;

                                const obj = document.body.scrollTop ? document.body : document.documentElement;
                                this.gameProxy.gamePreData.scrollY = obj.scrollTop;

                                //@ts-ignore
                                if (judgeClient() == "PC" || window.navigator.standalone) {
                                    if (this.gameProxy.currGame.ori_vendor_extend) {
                                        const ori_vendor_extend = JSON.parse(this.gameProxy.currGame.ori_vendor_extend);
                                        //@ts-ignore
                                        if (window.navigator.standalone && ori_vendor_extend.iframe_bad) {
                                            // iframe无法正常显示的游戏
                                            OpenLink(body.url);
                                        } else {
                                            page_game_play.show(body.url);
                                        }
                                    } else {
                                        page_game_play.show(body.url);
                                    }
                                } else {
                                    OpenLink(body.url);
                                }
                            } else {
                                let gameUrl = "";
                                if (body.url.indexOf("?") != -1) {
                                    //有个别厂商链接后面会有#，导致横竖屏参数不能使用
                                    if (body.url.indexOf("#") != -1) {
                                        // gameUrl = body.url + "&gOrientation=" + this.gameProxy.currGame.orientation;
                                        gameUrl = this.insertStr(
                                            body.url,
                                            body.url.indexOf("#"),
                                            "&gOrientation=" + this.gameProxy.currGame.orientation
                                        );
                                    } else {
                                        gameUrl = body.url + "&gOrientation=" + this.gameProxy.currGame.orientation;
                                    }
                                } else {
                                    if (body.url.indexOf("#") != -1) {
                                        // gameUrl = body.url + "?gOrientation=" + this.gameProxy.currGame.orientation;
                                        gameUrl = this.insertStr(
                                            body.url,
                                            body.url.indexOf("#"),
                                            "?gOrientation=" + this.gameProxy.currGame.orientation
                                        );
                                    } else {
                                        gameUrl = body.url + "?gOrientation=" + this.gameProxy.currGame.orientation;
                                    }
                                }
                                console.log("gameUrl====", gameUrl);
                                WebViewBridge.getInstance().openBrowser(gameUrl);
                            }
                        },
                    });
                }
                break;
            case net.EventType.api_plat_var_notice_index:
                {
                    const noticeProxy: NoticeProxy = getProxy(NoticeProxy);
                    noticeProxy.setData(body);
                }
                break;
            case net.EventType.api_plat_fag_index:
                {
                    const fagProxy: FagProxy = getProxy(FagProxy);
                    fagProxy.setData(body);
                }
                break;
            case net.EventType.api_user_var_red_dot_tips:
                this.selfProxy.redDotTips(body);
                break;
        }
    }

    private insertStr(soure: string, start: number, newStr: string): string {
        return soure.slice(0, start) + newStr + soure.slice(start);
    }
}
