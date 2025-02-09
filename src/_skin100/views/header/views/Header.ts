import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangConfig from "@/core/config/LangConfig";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import ScrollUtil from "@/core/global/ScrollUtil";
import GameProxy from "@/proxy/GameProxy";
import router from "@/_skin100/router";
import dialog_login from "@/_skin100/views/dialog_login";
import dialog_register from "@/_skin100/views/dialog_register";
import Cookies from "js-cookie";
import { Prop, Watch, Component } from "vue-property-decorator";
import HeaderMediator from "../mediator/HeaderMediator";
import HeaderProxy from "../proxy/HeaderProxy";
import LoginEnter from "@/_skin100/core/global/LoginEnter";
import OpenLink from "@/core/global/OpenLink";

@Component
export default class Header extends AbstractView {
    gameProxy: GameProxy = getProxy(GameProxy);
    myProxy: HeaderProxy = getProxy(HeaderProxy);
    pageData = this.myProxy.pageData;
    CategoryIcon = Assets.CategoryIcon;
    routerPath = this.$router.app.$route.path;
    core = core;
    LangUtil = LangUtil;

    GamePlatConfig = GamePlatConfig;
    LangConfig = LangConfig;

    constructor() {
        super(HeaderMediator);
    }

    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
    }
    /**打开主页 */
    goHome() {
        if (this.$router.app.$route.path != "/") {
            router.push("/");
        }
        ScrollUtil(0);
    }
    /**打开挖矿 */
    goToMyPage() {
        LoginEnter(() => {});
        if (this.$router.app.$route.path != "/page_mine") {
            router.push("/page_mine");
        }
        ScrollUtil(0);
    }
    /**打开分红 */
    goToMyBonus() {
        LoginEnter(() => {});
        if (this.$router.app.$route.path != "/page_bonus") {
            router.push("/page_bonus");
        }
        ScrollUtil(0);
    }
    /**打开交易 */
    goToMySwap() {
        if (this.$router.app.$route.path != "/page_swap") {
            router.push("/page_swap");
        }
        ScrollUtil(0);
    }
    /**打开介绍页面 */
    goIntroduce() {
        router.push("/page_introduce");
    }
    /**打开登录页面 */
    handlerLogin() {
        dialog_login.show();
    }
    /**打开注册页面 */
    handlerRegister() {
        dialog_register.show();
    }
    /**锚点跳转 */
    goAnchor(id: string) {
        if (this.routerPath != "/") this.goHome();
        setTimeout(() => {
            const anchor: any = document.getElementById(id);
            if (anchor) {
                ScrollUtil(anchor.offsetTop);
            }
        }, 100);
    }
    // /**切换语言 */
    // onLangChange() {
    //     Cookies.set("lang", core.lang);
    //     location.reload();
    // }
    /**切换语言 */
    onLangChange() {
        window.localStorage.setItem("lang", core.lang);
        location.reload();
    }
    onService() {
        const link = LangUtil("客服链接") + "?id=" + core.user_id;
        try {
            window.open(
                link,
                LangUtil("客服"),
                "height=680, width=680, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
            );
        } catch (e: any) {
            OpenLink(link);
        }
    }
}
