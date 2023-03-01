import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Component, Watch } from "vue-property-decorator";
import Assets from "./assets/Assets";
import ScrollUtil from "@/core/global/ScrollUtil";
import AppProxy from "./AppProxy";
import ServiceUtil from "./core/global/ServiceUtil";
import { isMobile, judgeClient } from "@/core/global/Functions";
import PageBlur from "./core/PageBlur";

@Component
export default class APP extends AbstractView {
    commonIcon = Assets.commonIcon;
    PageBlur = PageBlur;
    LangUtil = LangUtil;
    myProxy: AppProxy = this.getProxy(AppProxy);
    core = core;
    constructor() {
        super();
        this.onWatchTheme();
    }

    mounted() {
        window.addEventListener('scroll', this.onWatchScroll, true);

        //获取设备当前时间
        const timenow_hour = (new Date()).getHours();
        //白天
        if (timenow_hour > 5 && timenow_hour < 18) {
            this.$vuetify.theme.dark = false;
        }
        else {
            this.$vuetify.theme.dark = true;
        }
        //console.log("当前 时间----小时 ", timenow_hour);
        //this.$vuetify.theme.dark = true;
    }

    //切换明暗
    autoChangeDarkByTime()
    {
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
            if (this.$route.path == "/page_game_soccer" || this.$route.path == "/page_game_play") {
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
        //return true;
        return this.myProxy.isShowGuide;
     }
     onGuide() {
        this.myProxy.onGuide();
    }
    get guideImg() {
        return this.core.lang.includes("zh") ? require("@/assets/guide/img03.png") : require("@/assets/guide/img04.png");
    }
    onCloseGuide()
    {
        this.myProxy.guideDrawer = false;
    }
}
