import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangConfig from "@/core/config/LangConfig";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import ScrollUtil from "@/core/global/ScrollUtil";
import GameProxy from "@/proxy/GameProxy";
import router from "@/router";
import dialog_login from "@/views/dialog_login";
import dialog_register from "@/views/dialog_register";
import Cookies from "js-cookie";
import { Prop, Watch, Component } from "vue-property-decorator";
import HeaderMediator from "../mediator/HeaderMediator";
import HeaderProxy from "../proxy/HeaderProxy";

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
    //当前活动的分类
    categoryActive = -1;

    constructor() {
        super(HeaderMediator);
    }

    mounted() {
        window.addEventListener("scroll", this.scrollHandle, true);
        this.scrollHandle();
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
    /**切换语言 */
    onLangChange() {
        Cookies.set("lang", core.lang);
        location.reload();
    }

    onService() {
        OpenLink(LangUtil("客服链接"));
    }

    scrollHandle() {
        this.categoryActive = -1;
        if (!this.$vuetify.breakpoint.mobile) {
            const len = this.pageData.lobbyIndex.length;
            for (let i = 0; i < len; i++) {
                const item = this.pageData.lobbyIndex[i];
                const div = document.getElementById(item.category.toString());
                if (div) {
                    const rect = div.getBoundingClientRect();
                    if (rect.top <= 250 && rect.bottom - 50 > 155) {
                        this.categoryActive = i;
                        break;
                    }
                }
            }
        }
    }
}
