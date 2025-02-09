import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Component, Watch, Vue } from "vue-property-decorator";
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
import SkinVariable from "@/_skin030/core/SkinVariable";
import { track_error_event } from "@/core/config/ErrorEvent";
import GameConfig from "@/core/config/GameConfig";
import ActivityConfig from "@/core/config/ActivityConfig";
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
    SkinVariable = SkinVariable;
    notice = PanelUtil.getProxy_noticeProxy;
    activityConfig = ActivityConfig.config;
    constructor() {
        super();
        this.onWatchTheme();
    }
    created() {
        const isM = !!isMobile();
        // window.addEventListener("resize", this.onResize);
        this.onResize();
    }

    /**发送 错误  */
    errorCaptured(error: any, vm: any, info: any) {
        const errorData = {
            error: error.message,
            component: vm.$options.name,
            stack: error.stack,
            info: info,
        };
        track_error_event(errorData, "Vue_error");
        //return false; // 阻止错误继续向上冒泡
    }

    last_mobile_type = false;
    onResize() {
        // const isM = !!isMobile();
        // // PanelUtil.message_alert(navigator.userAgent);
        // if (isM) {
        //     window.$mobile = Vue.prototype.$mobile = this.$vuetify.breakpoint.mobile;
        // } else {
        //     window.$mobile = Vue.prototype.$mobile = false;
        // }
        // window.$xsOnly = Vue.prototype.$xsOnly = !!Vue.vuetify.framework.breakpoint.xsOnly && !!isMobile();

        window.$xsOnly = Vue.prototype.$xsOnly = Vue.vuetify.framework.breakpoint.xsOnly;
        window.$mobile = Vue.prototype.$mobile = Vue.vuetify.framework.breakpoint.mobile;

        this.last_mobile_type = window.$mobile;
        //console.log("---上一次名字---", this.last_mobile_type);
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
        html.style.backgroundColor = this.$vuetify.theme.dark ? "#388465" : "#f4f4f4";
    }

    isShowTopBtn = false;
    onWatchScroll() {
        this.isShowTopBtn = window.scrollY > 200;
    }
    onService() {
        ServiceUtil();
    }
    onPartnerService() {
        ServiceUtil("partner");
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
            if (this.$vuetify.breakpoint.width > 1200) {
                this.isScreenV = true;
            } else if (judgeClient() == "iOS") {
                this.isScreenV = this.$vuetify.breakpoint.width < this.$vuetify.breakpoint.height;
            } else {
                if (!this.$xsOnly) {
                    this.isScreenV = true;
                } else {
                    this.isScreenV = !window.orientation || window.orientation == 180 || window.orientation == 0;
                }
            }
            console.log("---this.$vuetify.breakpoint.mobile", this.$vuetify.breakpoint.mobile);
            if (this.last_mobile_type != this.$vuetify.breakpoint.mobile) {
                this.last_mobile_type = this.$vuetify.breakpoint.mobile;
                window.location.reload();
            }

            // if (this.$vuetify.breakpoint.width > 1280)
            // {
            //     console.log("需要显示 pc版 ");
            //     console.log("---上一次名字---",this.last_mobile_type);
            // }
            // else
            // {
            //     console.log("切换 手机版");
            //     console.log("---上一次名字---",this.last_mobile_type);
            //     console.log("---上一次名字---",window.$mobile);

            // }
        });
    }
    get isShowHeader() {
        if (this.$mobile) {
            if (this.$route.path.includes("page_game_soccer") || this.$route.path.includes("page_game_play")) {
                return false;
            }
            return true;
        } else if (!this.$mobile) {
            return true;
        }
    }
    head_game_config = GameConfig.config.head_game_config || [];
    get isShowFooter() {
        if (this.$mobile) {
            if (
                this.$route.path.includes("page_game_soccer") ||
                this.$route.path.includes("page_game_play") ||
                this.$route.path.includes("cricket")
            ) {
                return false;
            }
            for (let index = 0; index < this.head_game_config.length; index++) {
                const element = this.head_game_config[index];

                if (this.$route.path.includes(element.router_name)) {
                    return false;
                }
            }
            return true;
        } else {
            if (this.$route.path.includes("page_game_soccer") || this.$route.path.includes("cricket")) {
                return false;
            }
            return true;
        }
    }
    @Watch("myProxy.bshowNavigationPanel")
    navigationPanelShow() {
        PageBlur.blur_page(this.myProxy.bshowNavigationPanel);
    }
    get isShowGuide() {
        if (ModulesHelper.isHide_HomeDownloadBtn()) return false;
        if (!this.$mobile || !this.myProxy.isShowGuide) return false;

        // if (this.$route.path == Vue.prePath || this.$route.path == Vue.prePath + "/" || this.$route.path.includes("page_my_info"))
        if (this.$route.path == Vue.prePath || this.$route.path == Vue.prePath + "/") return true;

        if (
            this.$route.path.includes("cricket") ||
            this.$route.path.includes("page_game_soccer") ||
            this.$route.path.includes("page_recharge")
        )
            return false;

        // if (this.myProxy.mobile_menu_ary && this.myProxy.mobile_menu_ary.length > 0) {
        //     for (let index = 0; index < this.myProxy.mobile_menu_ary.length; index++) {
        //         const element = this.myProxy.mobile_menu_ary[index];
        //         if (element.id != 0) {
        //             if (this.$route.path.includes(element.path)) {
        //                 return true;
        //             }
        //         }
        //     }
        //     if (this.Constant.isIncludeGameRouter(this.$route.path)) {
        //         return true;
        //     }
        // }
        return false;
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
    onClickBtnSpin() {
        PanelUtil.openpanel_spin_lottery();
    }
    get showSpinLottery() {
        return this.activityConfig.spin.is_open;
    }
}
