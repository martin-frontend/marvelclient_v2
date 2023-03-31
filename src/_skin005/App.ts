import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Component, Watch } from "vue-property-decorator";
import Assets from "./assets/Assets";
import ScrollUtil from "@/core/global/ScrollUtil";
import AppProxy from "./AppProxy";
import ServiceUtil from "./core/global/ServiceUtil";
import { isMobile, isSafari, judgeClient } from "@/core/global/Functions";
import PageBlur from "./core/PageBlur";
import ModulesHelper from "./core/ModulesHelper";
import PanelUtil from "./core/PanelUtil";
import LangConfig from "@/core/config/LangConfig";
import Constant from "@/core/global/Constant";
@Component
export default class APP extends AbstractView {
    commonIcon = Assets.commonIcon;
    PageBlur = PageBlur;
    LangUtil = LangUtil;
    isSafari = isSafari;
    LangConfig = LangConfig;
    ModulesHelper = ModulesHelper;
    myProxy: AppProxy = this.getProxy(AppProxy);
    core = core;
    Constant = Constant;
    constructor() {
        super();
        this.onWatchTheme();
    }

    mounted() {
        window.addEventListener("scroll", this.onWatchScroll, true);
    }

    //切换明暗
    autoChangeDarkByTime() {
        //获取 之前玩家保存之后的 明暗 的值 的 时间
        const userLang = window.localStorage.getItem("lang");
    }

    //当前路由
    routerPath = this.$router.app.$route.path;
    @Watch("$vuetify.theme.dark")
    onWatchTheme() {
        const html: HTMLElement = <any>document.getElementsByTagName("html")[0];
        html.style.backgroundColor = this.$vuetify.theme.dark ? "#202121" : "#f4f4f4";
    }

    isShowTopBtn = false;
    onWatchScroll() {
        this.isShowTopBtn = window.scrollY > 200;
    }
    onService() {
        ServiceUtil();
    }
    onTop() {
        //window.scrollTo(0, 0);
        ScrollUtil(0);
    }

    @Watch("headerProxy.pageData.bShowUserPanel")
    onWatchUserPanelShow() {
        if (isMobile()) {
            if (this.myProxy.bshowUserPanel) {
                document.documentElement.style.overflow = "hidden";
                //@ts-ignore
                document.body.scroll = "no";
            } else {
                document.documentElement.style.overflow = "scroll";
                //@ts-ignore
                document.body.scroll = "yes";
            }
        }
    }

    //是否竖屏
    isScreenV = true;
    @Watch("$vuetify.breakpoint.width")
    onWatchScreen() {
        this.$nextTick(() => {
            if (judgeClient() == "iOS") {
                this.isScreenV = this.$vuetify.breakpoint.width < this.$vuetify.breakpoint.height;
            } else {
                this.isScreenV = !window.orientation || window.orientation == 180 || window.orientation == 0;
            }
        });
    }
    get isShowHeader() {
        if (this.$vuetify.breakpoint.mobile) {
            if (this.$route.path.includes("page_game_soccer") || this.$route.path.includes("page_game_play")) {
                return false;
            }
            return true;
        } else if (!this.$vuetify.breakpoint.mobile) {
            return true;
        }
    }

    @Watch("myProxy.bshowNovigationPanel")
    novigationPanelShow() {
        PageBlur.blur_page(this.myProxy.bshowNovigationPanel);
    }
    get isShowGuide() {
        if (!this.$vuetify.breakpoint.mobile || !this.myProxy.isShowGuide) return false;

        if (this.$route.path == "/" + LangConfig.getRouterLang()) return true;

        if (this.myProxy.mobile_menu_ary && this.myProxy.mobile_menu_ary.length > 0) {
            for (let index = 0; index < this.myProxy.mobile_menu_ary.length; index++) {
                const element = this.myProxy.mobile_menu_ary[index];
                if (element.id != 0) {
                    if (this.$route.path.includes(element.path)) {
                        return true;
                    }
                }
            }
            if (this.Constant.isIncludeGameRouter(this.$route.path)) {
                return true;
            }
        }
        return false;
        // if(this.$route.path == '/' + LangConfig.getRouterLang() ||
        // this.$route.path ==)
        // {

        // }
        //return true;
        //return this.myProxy.isShowGuide;
    }
    onGuide() {
        this.myProxy.onGuide();
    }
    get guideImg() {
        return this.LangConfig.getRouterLang().includes("zh") ? require("@/assets/guide/img03.png") : require("@/assets/guide/img04.png");
    }
    onCloseGuide() {
        this.myProxy.guideDrawer = false;
    }
}
