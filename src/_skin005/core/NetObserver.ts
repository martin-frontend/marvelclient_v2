import AbstractMediator from "@/core/abstract/AbstractMediator";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import getProxy from "@/core/global/getProxy";
import NotificationName from "@/core/NotificationName";
import FagProxy from "@/proxy/FagProxy";

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
import { initGTM, initMainGTM, track, TrackData, TrackTypeMap } from "./TrackManager";
import GlobalVar from "@/core/global/GlobalVar";
import { getVersion } from "@/core/global/Functions";
import SelfProxy from "@/proxy/SelfProxy";
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
            net.EventType.api_plat_var_notice_show_var,
            net.EventType.api_plat_fag_index,
            net.EventType.api_user_var_red_dot_tips,
            net.EventType.api_plat_var_game_menu,
            net.EventType.api_plat_var_game_category,
            net.EventType.api_user_var_event_record,
            net.EventType.api_user_var_event_record_update,
            net.EventType.api_plat_var_game_search,
            net.EventType.REQUEST_ERROR,
            net.EventType.api_user_third_login,
            net.EventType.api_user_var_plat_users_verification_show,
            net.EventType.api_user_login,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        switch (notification.getName()) {
            //系统配置
            case NotificationName.GAME_CONFIG:
                if (GameConfig.config.h5version && process.env.VUE_APP_ENV == "production" && process.env.NODE_ENV == "production") {
                    const v1 = new Date(GameConfig.config.h5version);
                    const v2 = new Date(getVersion());
                    if (v1.getTime() > v2.getTime()) {
                        window.location.reload();
                    }
                }
                //获取语言配置
                this.sendNotification(net.HttpType.api_plat_var_language_config, { plat_id: core.plat_id });
                break;
            case net.EventType.api_plat_var_language_config:
                {
                    LangConfig.language = body.language;
                    LangConfig.main_language = body.main_language;
                    //确定语言

                    let userLang = LangConfig.getLangByRouter();
                    if (!LangConfig.language[userLang]) {
                        userLang = <any>window.localStorage.getItem("lang");
                    }
                    if (userLang && LangConfig.language[userLang]) {
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
                PanelUtil.getProxy_noticeProxy.api_plat_var_notice_index();
                break;
            case NotificationName.LANG_CONFIG:
                {
                    //@ts-ignore
                    // window["vm"].$mount("#app");
                    window["vueInit"]();

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

                    if (SkinVariable.isNeedKefu) {
                        this.addKefu();
                    }
                    this.addGTM();
                    //this.addkwaiq();
                    document.title = LangUtil("96 Sports");
                }
                break;
            case net.EventType.api_user_logout:
                PanelUtil.showAppLoading(false);
                this.selfProxy.loginout();

                PanelUtil.message_alert({
                    message: LangUtil("您的帐号已经退出"),
                    closeTime: 3000,
                    okFun: () => {
                        //Vue.router.replace("/");
                        //PanelUtil.openpage_home();
                        location.reload();
                    },
                });
                break;
            //用户信息
            case net.EventType.api_user_show_var:
                this.selfProxy.setUserInfo(body);
                break;
            case net.EventType.api_user_var_event_record:
                console.log("收到用户事件", body);

                if (body && body.length > 0) {
                    for (let index = 0; index < body.length; index++) {
                        const element = body[index];
                        if (!TrackData.Instance.addEventData(element)) {
                            continue;
                        }
                        element.data.bet_id = element.bet_id;
                        track(element.event_type, element.data, element.type == 1 ? TrackTypeMap.Purchase : TrackTypeMap.normal);
                        this.selfProxy.api_user_var_event_record_update(element.bet_id);
                    }
                }

                break;
            case net.EventType.api_user_var_event_record_update:
                console.log("收到用户更新事件", body);
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
            case net.EventType.api_plat_var_game_category:
                this.gameProxy.setGameCategory(body);
                break;

            case net.EventType.api_vendor_var_ori_product_visitor_show_var:
            case net.EventType.api_vendor_var_ori_product_show_var:
                {
                    this.gameProxy.loading = false;
                    PanelUtil.showAppLoading(false);

                    //检测返回的游戏 是不是在 head game中的
                    let headitem;
                    for (let index = 0; index < GameConfig.config.head_game_config.length; index++) {
                        const element = GameConfig.config.head_game_config[index];
                        if (element.vendor_id == this.gameProxy.currGame.vendor_id) {
                            headitem = element;
                            const homeProxy = PanelUtil.getProxy_page_home;
                            //const isCricket = this.gameProxy.currGame.vendor_id == GameConfig.config.CricketVendorId;
                            const headerProxy = getProxy(HeaderProxy);
                            headerProxy.resetTab(index + 1);
                            const url = body.url;
                            if (homeProxy.pageData.event_id) {
                                //page_game_soccer.show(body.url + `#/page_matche?id=${homeProxy.pageData.event_id}`);
                                PanelUtil.openpage_sport(url + `#/page_matche?id=${homeProxy.pageData.event_id}`, false);
                                homeProxy.pageData.event_id = 0;
                            } else {
                                PanelUtil.openpage_headgame(url, element);
                            }
                            return;
                        }
                    }
                    this.gameProxy.saveGame();
                    // 如果是体育，直接进入
                    if (
                        (this.gameProxy.currGame.vendor_id == GameConfig.config.SportVendorId &&
                            this.gameProxy.currGame.ori_product_id == 1) ||
                        this.gameProxy.currGame.vendor_id == GameConfig.config.CricketVendorId
                    ) {
                        const homeProxy = PanelUtil.getProxy_page_home;
                        const isCricket = this.gameProxy.currGame.vendor_id == GameConfig.config.CricketVendorId;
                        const headerProxy = getProxy(HeaderProxy);
                        headerProxy.resetTab(isCricket ? 22 : 1);

                        const url = body.url;
                        if (homeProxy.pageData.event_id) {
                            //page_game_soccer.show(body.url + `#/page_matche?id=${homeProxy.pageData.event_id}`);
                            PanelUtil.openpage_sport(url + `#/page_matche?id=${homeProxy.pageData.event_id}`, isCricket);
                            homeProxy.pageData.event_id = 0;
                        } else {
                            PanelUtil.openpage_sport(url, isCricket);
                        }
                        return;
                    }

                    const { coin_name_unique } = this.gameProxy;
                    let settle_coin_name_unique = "";
                    if (body.settle_coin_name_unique) {
                        settle_coin_name_unique = body.settle_coin_name_unique;
                    }
                    let msgstr = LangUtil("进入游戏");
                    let isShowConfig = false;
                    if (settle_coin_name_unique && settle_coin_name_unique != coin_name_unique) {
                        msgstr = LangUtil("您当前使用的货币为{0}将会折算成等价的{1}进入游戏", coin_name_unique, settle_coin_name_unique);
                        isShowConfig = true;
                    }
                    this.openGameUrl(body, msgstr, isShowConfig);
                }
                break;
            case net.EventType.api_plat_var_notice_index:
                {
                    const noticeProxy = PanelUtil.getProxy_noticeProxy;
                    noticeProxy.setData(body);
                    setTimeout(() => {
                        this.openNoticeDialog();
                        if (noticeProxy.data.listType3 && noticeProxy.data.listType3.length > 0) {
                            PanelUtil.openpanel_notice();
                        }
                    }, 2000);
                }
                break;
            case net.EventType.api_user_login:
                setTimeout(() => {
                    this.openNoticeDialog();
                }, 1000);
                break;
            case net.EventType.api_plat_var_notice_show_var:
                {
                    const noticeProxy = PanelUtil.getProxy_noticeProxy;
                    noticeProxy.set_detail_notice(body);
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
                    PanelUtil.getProxy_gameproxy.setSearchResult(body);
                }
                break;
            case net.EventType.REQUEST_ERROR:
                if (body.url == net.getUrl(net.HttpType.api_plat_var_game_search, body.data)) {
                    PanelUtil.getProxy_gameproxy.api_user_var_game_search_error_back();
                }
                break;
            // bet2dream登录
            case net.EventType.api_user_third_login:
                this.loginSuccess(body);
                break;
            // 用户认证状态
            case net.EventType.api_user_var_plat_users_verification_show:
                this.selfProxy.setUserVerificationData(body);
                break;
        }
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

    openGameUrl(body: any, msg: string, isShowConfig: boolean) {
        let isNeetConfig = false;
        //判断是否需要打开 弹框   1.不要打开弹窗的情况
        if (core.app_type == core.EnumAppType.WEB) {
            this.gameProxy.gamePreData.lastRouter = Vue.router.currentRoute.path;
            this.gameProxy.gamePreData.historyLength = window.history.length;

            const obj = document.body.scrollTop ? document.body : document.documentElement;
            this.gameProxy.gamePreData.scrollY = obj.scrollTop;
            //@ts-ignore
            if (judgeClient() == "PC" || window.navigator.standalone) {
                if (this.gameProxy.currGame.ori_vendor_extend) {
                    const ori_vendor_extend = JSON.parse(this.gameProxy.currGame.ori_vendor_extend);
                    //@ts-ignore   // iframe无法正常显示的游戏
                    if ((window.navigator.standalone && ori_vendor_extend.iframe_bad) || ori_vendor_extend.iframe_all_bad) {
                        isNeetConfig = true;
                    }
                }
            } else {
                isNeetConfig = true;
            }

            if (isNeetConfig) {
                PanelUtil.message_confirm({
                    message: msg,
                    okFun: () => {
                        if (GlobalVar.skin == "skin020") {
                            PanelUtil.showAppLoading(true);
                        }
                        OpenLink(body.url);
                    },
                });
            } else {
                if (isShowConfig) {
                    PanelUtil.message_confirm({
                        message: msg,
                        okFun: () => {
                            PanelUtil.openpage_game_play(body.url);
                        },
                    });
                } else {
                    PanelUtil.openpage_game_play(body.url);
                }
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
            // PanelUtil.message_confirm({
            //     message: msg,
            //     okFun: () => {
            //         console.log("gameUrl====", gameUrl);
            //         WebViewBridge.getInstance().openBrowser(gameUrl);
            //     },
            // });
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

    addKefu() {
        console.log("添加 客服 代码");
        const s = document.createElement("script");
        s.async = true;
        s.id = "kefu__widget";
        s.src = "https://enterprise.getkookoo.com/chatwidget/chatWidget.js";
        //@ts-ignore
        window.chatConfig = {
            CA_SCRIPT: "https://in1-ccaas-api.ozonetel.com/chatwidgetv2/caChatAPI.js",
            clientInfo: {
                DID: "918048811462",
                API_KEY: "KKcd02d4b3125146c88091dc668ce6bf02",
            },
            widgetConfig: {
                title: "96 CS",
                headerLogo: "loding_icon_5.png?" + getVersion(),
                showHeaderLogo: true,
            },
            userForm: [
                {
                    name: "Name",
                    required: true,
                    hide: false,
                },
                {
                    name: "Email",
                    required: false,
                    hide: false,
                },
                {
                    name: "Phone",
                    required: true,
                    hide: false,
                },
                {
                    name: "UUI",
                    required: false,
                    hide: true,
                },
            ],
            theme: {
                primary: "#FEBA00",
                conversation: {
                    body: "#FFFF",
                    messagePreview: "#f4f7f9",
                    text: "#000000",
                },
            },
        };
        document.body.appendChild(s);
    }
    /**添加GTM的id */
    addGTM() {
        //正式环境
        if (process.env.VUE_APP_ENV == "production") {
            let gtm_id = GameConfig.config.gtm_id;
            if (!gtm_id || !gtm_id.trim()) {
                if (GlobalVar.skin == "skin005") {
                    gtm_id = "GTM-TL9S3KT";
                } else if (GlobalVar.skin == "skin008") {
                    gtm_id = "GTM-NNNNR66";
                } else {
                    SkinVariable.useGTM = false;
                    return;
                }
            }
            SkinVariable.useGTM = true;
            initGTM(gtm_id);
        } //非正式环境
        else {
            SkinVariable.useGTM = true;
            let gtm_id = GameConfig.config.gtm_id;
            console.log("收到的 gtm id 为", gtm_id);
            if (!gtm_id || !gtm_id.trim()) {
                gtm_id = "GTM-NDDVSJT";
            }
            initGTM(gtm_id);
        }
        //主账号的是gtm
        const gtm_main_id = GameConfig.config.gtm_main_id || "GTM-KJ55HHC";
        initMainGTM(gtm_main_id);
    }

    addkwaiq() {
        let kwaiq_id = GameConfig.config.kwaiq_id;

        if (!kwaiq_id) {
            if (GlobalVar.skin == "skin008") {
                kwaiq_id = "485558583095734343";
            } else {
                return;
            }
        }
        if (kwaiq_id) {
            //@ts-ignore
            const kwaiq = window.kwaiq;
            console.log("调用-1111---", kwaiq);
            if (kwaiq) {
                console.log("调用----");
                kwaiq.load(kwaiq_id);
                kwaiq.page();
            }
        }
    }
    /**显示 所有的 进入 弹窗都在这个地方显示 */
    openNoticeDialog() {
        if (!core.user_id) return;
        //获取 其他窗口的 弹窗
        //const dialog_manager = ["dailysign", "promotionreward"];
        const dialog_manager = GameConfig.config.dialog_manager || [];
        const newArr = dialog_manager.reverse();
        for (let index = 0; index < newArr.length; index++) {
            const element = newArr[index];
            // setTimeout(() => {
            switch (element) {
                case "dailysign":
                    PanelUtil.openpanel_dailysign();
                    break;
                case "promotionreward":
                    PanelUtil.openpanel_promotionreward();
                    break;
                default:
                    break;
            }
            // }, 200);
        }
    }
}
