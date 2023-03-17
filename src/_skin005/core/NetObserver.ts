import NoticeProxy from "@/proxy/NoticeProxy";

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

import { MapLang } from "@/core/map/MapLang";
import Vue from "vue";
import { DatePicker } from "element-ui";
import lang_en from "element-ui/lib/locale/lang/en";
import lang_ja from "element-ui/lib/locale/lang/ja";
import lang_ko from "element-ui/lib/locale/lang/ko";
import lang_es from "element-ui/lib/locale/lang/es";
import lang_vi from "element-ui/lib/locale/lang/vi";
import lang_zh from "element-ui/lib/locale/lang/zh-CN";
import lang_zhtw from "element-ui/lib/locale/lang/zh-TW";
import localeE from "element-ui/lib/locale";
import GameConfig from "@/core/config/GameConfig";
import PanelUtil from "./PanelUtil";
import SkinVariable from "./SkinVariable";
import HeaderProxy from "../views/header/HeaderProxy";
// import HeaderProxy from "../views/header/proxy/HeaderProxy";

export default class NetObserver extends AbstractMediator {
    static NAME = "NetObserver";

    private selfProxy = PanelUtil.getProxy_selfproxy;
    private gameProxy = PanelUtil.getProxy_gameproxy;

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
            net.EventType.api_vendor_var_ori_product_visitor_show_var,
            net.EventType.api_plat_var_notice_index,
            net.EventType.api_plat_fag_index,
            net.EventType.api_user_var_red_dot_tips,
            net.EventType.api_plat_var_game_menu,
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

                    let userLang = location.href.split("/").reverse()[0];
                    if (!LangConfig.language[userLang]) {
                        userLang = <any>window.localStorage.getItem("lang");
                    }
                    if (userLang && LangConfig.language[userLang]) {
                        core.lang = userLang;
                    } else {
                        //@ts-ignore
                        const sysLang: string = navigator.browserLanguage || navigator.language;
                        const sysLangCode = MapLang[sysLang] || MapLang[sysLang.substring(0, 2)];
                        if (LangConfig.language[sysLangCode]) {
                            core.lang = sysLangCode;
                        } else {
                            core.lang = LangConfig.main_language;
                        }
                    }

                    locale.use(core.lang);
                    console.log(">>>>>>>>>>>>core.lang: ", core.lang);

                    // 添加element ui 控件 语言
                    if (core.lang == "zh_CN") {
                        localeE.use(lang_zh);
                    } else if (core.lang == "zh_TW") {
                        localeE.use(lang_zhtw);
                    } else {
                        const langT = core.lang.substring(0, 2);
                        switch (langT) {
                            case "es":
                                localeE.use(lang_es);
                                break;
                            case "ko":
                                localeE.use(lang_ko);
                                break;
                            case "jp":
                                localeE.use(lang_ja);
                                break;
                            case "vi":
                                localeE.use(lang_vi);
                                break;
                            default:
                                localeE.use(lang_en);
                                break;
                        }
                    }
                    Vue.use(DatePicker);

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
                    // window["vm"].$mount("#app");
                    window["vueInit"]();

                    if (SkinVariable.isNeedPush) {
                        this.addPushNode();
                    }

                    //获取用户信息
                    this.selfProxy.api_user_show_var([2, 3, 6]);
                    //获取大厅游戏列表
                    this.gameProxy.api_plat_var_lobby_index();

                    //console.log("-----客服cid" ,LangUtil("客服CID" ));
                    if (LangUtil("客服CID").trim() && LangUtil("客服CID") != "客服CID") {
                        console.log("添加客服cid");
                        //添加客服
                        const s = document.createElement("script");
                        // s.async = false;
                        s.id = "respondio__widget";
                        s.src = `https://cdn.respond.io/webchat/widget/widget.js?cId=${LangUtil("客服CID")}`;
                        document.body.appendChild(s);
                    }

                    if (core.app_type == core.EnumAppType.APP) {
                        WebViewBridge.getInstance().enterHall();
                    }

                    this.setLanguageFont();
                }
                break;
            case net.EventType.api_user_logout:
                this.selfProxy.loginout();

                PanelUtil.message_alert({
                    message: LangUtil("您的帐号已经退出"),
                    okFun: () => {
                        //Vue.router.replace("/");
                        PanelUtil.openpage_home();
                        location.reload();
                    },
                });
                break;
            //用户信息
            case net.EventType.api_user_show_var:
                this.selfProxy.setUserInfo(body);
                break;
            case net.EventType.api_plat_var_lobby_index:
                this.gameProxy.setLobbyIndex(body);
                // {
                //     const headerProxy:HeaderProxy = getProxy(HeaderProxy);
                //     headerProxy.setLobbyIndex(body);
                // }
                break;
            case net.EventType.api_plat_var_game_menu:
                this.gameProxy.setGameMenu(body);
                // {
                //     const headerProxy: HeaderProxy = getProxy(HeaderProxy);
                //     headerProxy.setGameMenu(body);
                // }
                break;
            case net.EventType.api_vendor_var_ori_product_visitor_show_var:
            case net.EventType.api_vendor_var_ori_product_show_var:
                {
                    this.gameProxy.loading = false;
                    PanelUtil.showAppLoading(false);
                    // 如果是体育，直接进入
                    if (
                        (this.gameProxy.currGame.vendor_id == GameConfig.config.SportVendorId && this.gameProxy.currGame.ori_product_id == 1) ||
                        (this.gameProxy.currGame.vendor_id == GameConfig.config.CricketVendorId)
                    ) {
                        const homeProxy = PanelUtil.getProxy_page_home;
                        const isCricket = this.gameProxy.currGame.vendor_id == GameConfig.config.CricketVendorId;
                        const headerProxy = getProxy(HeaderProxy); 
                        headerProxy.resetTab(isCricket ? 22 : 1 )
                    
                        const url = body.url;
                        if (homeProxy.pageData.event_id) {
                            //page_game_soccer.show(body.url + `#/page_matche?id=${homeProxy.pageData.event_id}`);
                            PanelUtil.openpage_sport(url + `#/page_matche?id=${homeProxy.pageData.event_id}`);
                            homeProxy.pageData.event_id = 0;
                        } else {
                            PanelUtil.openpage_sport(url);
                        }
                        return;
                    }

                    const { coin_name_unique } = this.gameProxy;
                    let settle_coin_name_unique = "USDT";
                    if (body.settle_coin_name_unique) {
                        settle_coin_name_unique = body.settle_coin_name_unique;
                    }
                    PanelUtil.message_confirm({
                        message:
                            coin_name_unique == "USDT"
                                ? LangUtil("进入游戏")
                                : LangUtil("您当前使用的货币为{0}将会折算成等价的{1}进入游戏", coin_name_unique, settle_coin_name_unique),
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
                                            PanelUtil.openpage_game_play(body.url);
                                        }
                                    } else {
                                        PanelUtil.openpage_game_play(body.url);
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
                                //PanelUtil.message_info(" ======-1" + gameUrl);
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
    //根据选择的语言 设置 不同的字体
    private setLanguageFont() {
        //console.log("page 对象", page);
        //const langT = core.lang.substring(0, 2);
        //if (langT == "en")
        {
            const page = document.getElementById("app");
            if (page) {
                //console.log("切换英语字体 GOTHAM_BOOK");
                //page.style.fontFamily = "'GOTHAM_BOLD' ,'GOTHAM_BOOK' ";
                page.style.fontFamily = "'GOTHAM_BOOK' ,'GOTHAM_BOLD' ";
                //page.style.fontFamily = "GOTHAM_BOLD";
            }
        }
    }
    addPushNode() {
        console.log("添加推送 代码");
        //添加客服
        const s = document.createElement("script");
        s.async = false;
        s.id = "push__widget";
        s.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
        s.addEventListener('load', function f() {

            //@ts-ignore
            window.OneSignal = window.OneSignal || [];
            //@ts-ignore
            window.OneSignal.push(function () {
                //@ts-ignore
                window.OneSignal.init({
                    appId: "a000754a-4200-4698-bfba-5931035d5441",
                });
            });
        }, false);

        document.body.appendChild(s);

    }
}
