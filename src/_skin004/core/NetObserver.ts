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
import { judgeClient, sendPostMessage } from "@/core/global/Functions";
import OpenLink from "@/core/global/OpenLink";
import dialog_message_box from "@/views/dialog_message_box";
import page_game_play from "@/_skin004/views/page_game_play";
import page_game_soccer from "../views/page_game_soccer";
import PageHomeProxy from "../views/page_home/proxy/PageHomeProxy";
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
import HeaderProxy from "../views/header/proxy/HeaderProxy";
import dialog_notice from "@/_skin004/views/dialog_notice";
import page_game_list from "@/_skin004/views/page_game_list";
import AudioPlayerProxy from "@/_skin004/views/widget/audio_player/AudioPlayerProxy";
import { js_utils } from "custer-js-utils";
import SkinVariable from "./SkinVariable";

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
            net.EventType.api_plat_var_game_menu,
            net.EventType.api_plat_var_game_search,
            net.EventType.api_user_third_login,
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
                        if (LangConfig.language[userLang]) {
                            core.lang = userLang;
                        } else {
                            core.lang = LangConfig.main_language;
                        }
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
                    window["vm"].$mount("#app");

                    /**69登录 */
                    const token69 = js_utils.getQueryVariable("69token");
                    if (token69) {
                        this.sendNotification(net.HttpType.api_user_third_login, {
                            plat_id: core.plat_id,
                            channel_id: core.channel_id,
                            code: token69,
                            invite_user_id: core.invite_user_id,
                            vendor_unique_name: "Game69",
                        });
                    } else if (core.user_id) {
                        //获取用户信息
                        this.selfProxy.api_user_show_var([2, 3, 4, 5, 6]);
                    }

                    //获取大厅游戏列表
                    this.gameProxy.api_plat_var_lobby_index();
                    //添加客服
                    const s = document.createElement("script");
                    // s.async = false;
                    s.id = "respondio__widget";
                    s.src = `https://cdn.respond.io/webchat/widget/widget.js?cId=${LangUtil("客服CID")}`;
                    document.body.appendChild(s);

                    if (core.app_type == core.EnumAppType.APP) {
                        WebViewBridge.getInstance().enterHall();
                    }
                }
                break;
            case net.EventType.api_user_logout:
                this.selfProxy.loginout();
                console.log("是否为 手机版", Vue.vuetify.framework.breakpoint.mobile);
                dialog_message_box.alert({
                    message: LangUtil("您的帐号已经退出"),
                    okFun: () => {
                        // if ( Vue.vuetify.framework.breakpoint.mobile)
                        // {
                        //     page_game_list.show();
                        //     return;
                        // }
                        Vue.router.replace("/");
                    },
                });
                break;
            //用户信息
            case net.EventType.api_user_show_var:
                this.selfProxy.setUserInfo(body);
                break;
            case net.EventType.api_plat_var_lobby_index:
                this.gameProxy.setLobbyIndex(body);
                {
                    const headerProxy: HeaderProxy = getProxy(HeaderProxy);
                    headerProxy.setLobbyIndex(body);
                }
                break;
            case net.EventType.api_plat_var_game_menu:
                this.gameProxy.setGameMenu(body);
                {
                    const headerProxy: HeaderProxy = getProxy(HeaderProxy);
                    headerProxy.setGameMenu(body);
                }
                // 手机模式，跳到游戏列表页
                // if(Vue.vuetify.framework.breakpoint.mobile){
                //     page_game_list.show(0);
                // }
                break;
            case net.EventType.api_vendor_var_ori_product_show_var:
                {
                    const audioProxy: AudioPlayerProxy = this.getProxy(AudioPlayerProxy);
                    audioProxy.isBackgroundPlaying = false;

                    this.gameProxy.loading = false;
                    //PT电子，不使用外部地址打开
                    if (body.url.indexOf("http") == -1) {
                        if (process.env.VUE_APP_ENV != "production") {
                            body.url = "https://all.testjj9.com/coinfans/skin004/" + body.url;
                        }
                    }
                    // 如果是体育，直接进入
                    if (
                        this.gameProxy.currGame.vendor_id == GameConfig.config.SportVendorId &&
                        this.gameProxy.currGame.ori_product_id == 1
                    ) {
                        const homeProxy: PageHomeProxy = getProxy(PageHomeProxy);
                        const page = SkinVariable.isUsePageGamePlayShowSport ? page_game_play : page_game_soccer;
                        if (homeProxy.pageData.event_id) {
                            page.show(body.url + `#/page_matche?id=${homeProxy.pageData.event_id}`);
                            homeProxy.pageData.event_id = 0;
                        } else {
                            page.show(body.url);
                        }
                        return;
                    }
                    //console.log("返回消息",body);
                    const { coin_name_unique } = this.gameProxy;

                    let settle_coin_name_unique = "";
                    if (body.settle_coin_name_unique) {
                        settle_coin_name_unique = body.settle_coin_name_unique;
                    }
                    const ori_vendor_extend = JSON.parse(this.gameProxy.currGame.ori_vendor_extend);
                    const ddd = judgeClient();
                    //@ts-ignore
                    if (ori_vendor_extend.noConfirm && (window.navigator.standalone || judgeClient() != "iOS")) {
                        //判断如果没有添加到主屏幕并且属于ios系统就要强制弹窗
                        this.openGame(body, ori_vendor_extend);
                        return;
                    }
                    let msgstr = LangUtil("进入游戏");
                    if (settle_coin_name_unique && settle_coin_name_unique != coin_name_unique) {
                        msgstr = LangUtil("您当前使用的货币为{0}将会折算成等价的{1}进入游戏", coin_name_unique, settle_coin_name_unique);
                    }

                    dialog_message_box.confirm({
                        message: msgstr,
                        //LangUtil("进入游戏"),
                        okFun: () => {
                            this.openGame(body, ori_vendor_extend);
                        },
                        cancelFun: () => {
                            audioProxy.isBackgroundPlaying = true;
                        },
                    });
                }
                break;
            case net.EventType.api_plat_var_notice_index:
                {
                    const noticeProxy: NoticeProxy = getProxy(NoticeProxy);
                    noticeProxy.setData(body);

                    console.log("当前的路径位", Vue.router.history.current.path);
                    if (noticeProxy.data.listType3 && noticeProxy.data.listType3.length > 0 && Vue.router.history.current.path == "/")
                        dialog_notice.show();
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
            case net.EventType.api_plat_var_game_search:
                {
                    this.gameProxy.setSearchResult(body);
                }
                break;
            // bet2dream登录
            case net.EventType.api_user_third_login:
                this.loginSuccess(body);
                break;
        }
    }

    openGame(body: any, ori_vendor_extend: any) {
        if (core.app_type == core.EnumAppType.WEB) {
            this.gameProxy.gamePreData.lastRouter = router.currentRoute.path;
            this.gameProxy.gamePreData.historyLength = window.history.length;

            const obj = document.body.scrollTop ? document.body : document.documentElement;
            this.gameProxy.gamePreData.scrollY = obj.scrollTop;

            //@ts-ignore
            if (judgeClient() == "PC" || window.navigator.standalone) {
                if (this.gameProxy.currGame.ori_vendor_extend) {
                    if (
                        //@ts-ignore
                        (window.navigator.standalone && ori_vendor_extend.iframe_bad) ||
                        ori_vendor_extend.iframe_all_bad
                    ) {
                        // iframe无法正常显示的游戏
                        OpenLink(body.url);
                    } else {
                        page_game_play.show(body.url, ori_vendor_extend.refresh);
                    }
                } else {
                    page_game_play.show(body.url);
                }
            } else {
                OpenLink(body.url);
            }
        } else {
            let gameUrl = "",
                url: string,
                hash: string = "";
            const idxJ = body.url.indexOf("#");
            if (idxJ > 0) {
                url = body.url.slice(0, idxJ);
                hash = body.url.slice(idxJ);
            } else {
                url = body.url;
            }

            if (url.indexOf("?") != -1) {
                gameUrl = url + "&gOrientation=" + this.gameProxy.currGame.orientation;
            } else {
                gameUrl = url + "?gOrientation=" + this.gameProxy.currGame.orientation;
            }
            gameUrl += hash;
            WebViewBridge.getInstance().openBrowser(gameUrl);
        }

        const audioProxy: AudioPlayerProxy = this.getProxy(AudioPlayerProxy);
        audioProxy.isBackgroundPlaying = false;
        sendPostMessage({ methodName: "hideTab" });
    }

    private loginSuccess(body: any) {
        core.token = body.token;
        core.user_id = body.user_id;

        window.localStorage.setItem("token", core.token);
        window.localStorage.setItem("user_id", core.user_id.toString());
        window.localStorage.setItem("username", body.username);

        const selfProxy: SelfProxy = this.getProxy(SelfProxy);
        selfProxy.api_user_show_var([2, 3, 6]);
    }
}
