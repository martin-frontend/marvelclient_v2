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
import dialog_activity from "@/views/dialog_activity";
import dialog_login from "@/_skin004/views/dialog_login";
import dialog_register from "@/_skin004/views/dialog_register";
import { Prop, Watch, Component } from "vue-property-decorator";
import HeaderMediator from "../mediator/HeaderMediator";
import HeaderProxy from "../proxy/HeaderProxy";
import LoginEnter from "@/_skin004/core/global/LoginEnter";
import PageHomeProxy from "../../page_home/proxy/PageHomeProxy";
import page_game_list from "@/_skin004/views/page_game_list";
import page_mine from "@/_skin001/views/page_mine";
import page_extension from "@/_skin004/views/page_extension";
import SelfProxy from "@/proxy/SelfProxy";

import dialog_agent_manager from "@/_skin001/views/dialog_agent_manager";
import BlurUtil from "@/core/global/BlurUtil";
import GameConfig from "@/core/config/GameConfig";
import dialog_notice from "../../dialog_notice";
import WebViewBridge from "@/core/native/WebViewBridge";
import ServiceUtil from "@/_skin004/core/global/ServiceUtil";

@Component
export default class Header extends AbstractView {
    gameProxy: GameProxy = getProxy(GameProxy);
    myProxy: HeaderProxy = getProxy(HeaderProxy);
    pageData = this.myProxy.pageData;
    CategoryIcon = Assets.CategoryIcon;
    routerPath = this.$router.app.$route.path;
    core = core;
    LangUtil = LangUtil;
    commonIcon = Assets.commonIcon;
    GamePlatConfig = GamePlatConfig;
    LangConfig = LangConfig;
    homeProxy: PageHomeProxy = getProxy(PageHomeProxy);
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    constructor() {
        super(HeaderMediator);
    }
    //是否为新的 需要 菜单栏
    public get isNeetMenu(): boolean {
        return GameConfig.config.menuType == "1";
    }
    public get isShowDirectly(): number {
        if (!(this.selfProxy && this.selfProxy.userInfo && this.selfProxy.userInfo.user_id != 0)) {
            return 0;
        }
        if (this.selfProxy.userInfo.show_promote == 1) {
            return 1;
        }
        if (this.selfProxy.userInfo.show_promote == 2) {
            return 2;
        }

        return 0;
    }

    //当前活动的分类
    get categoryActive() {
        return this.myProxy.categoryActive;
    }

    mounted() {
        // window.addEventListener("scroll", this.scrollHandle, true);
        // this.scrollHandle();
    }

    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
    }
    /**打开主页 */
    goHome() {
        if (this.$router.app.$route.path != "/") {
            this.$router.push("/");
        }
        ScrollUtil(0);
    }
    /**打开足球 */
    goSoccer() {
        if (this.$router.app.$route.path == "/page_game_soccer") {
            return;
        }
        this.homeProxy.pageData.event_id = 0;
        LoginEnter(() => {
            const gameProxy: GameProxy = this.getProxy(GameProxy);
            gameProxy.go_soccer();
        });
    }
    getItemCategory(item: any) {
        if (item.category) {
            return item.category;
        }
        else {
            return item.vendor_type;
        }
    }
    getItemCategoryName(item: any) {
        if (item.category_name) {
            return item.category_name;
        }
        else {
            return item.vendor_type_name;
        }
    }

    isFilterChange = false;
    @Watch("isFilterChange")
    filterChange(val: boolean) {
        //console.log("状态切换" , val);
        // const ele = document.getElementById("gamelist");
        // if (ele) {
        //     ele.style.filter = this.isFilterChange ? "blur(10px)" : "none";
        // }
        // const ele_home = document.getElementById("pagehome");
        // if (ele_home) {
        //     ele_home.style.filter = this.isFilterChange ? "blur(10px)" : "none";
        // }

        const ele_main = document.getElementById("mainpage");
        if (ele_main) {
            ele_main.style.filter = this.isFilterChange ? "blur(10px)" : "none";
        }
       
    }
    setIsFilter(val: boolean) {
        this.isFilterChange = val;
        //console.log("22值在改变" ,val);
    }

    filterArr = <any>{};
    setFilters(index: any, val: boolean) {
        this.filterArr[index] = val;

        const keys = Object.keys(this.filterArr);
        for (let n = 0; n < keys.length; n++) {
            if (this.filterArr[keys[n]] == true) {
                this.isFilterChange = true;
                return;
            }
        }
        this.isFilterChange = false;
    }

    goCategory(id: any) {
        this.myProxy.categoryActive = id;
        page_game_list.show(id);
    }

    goMine() {
        LoginEnter(page_mine.show);
    }

    goExtension() {
        // if (this.isShowDirectly == 2) {
        //     LoginEnter(dialog_agent_manager.show);
        // } else if (this.isShowDirectly == 1) 
        LoginEnter(page_extension.show);
    }
    /**打开介绍页面 */
    goIntroduce() {
        router.push("/page_introduce");
    }
    /**打开活动页面 */
    goActivity() {
        dialog_activity.show();
    }
    /**打开登录页面 */
    handlerLogin() {
        dialog_login.show();
    }
    /**打开注册页面 */
    handlerRegister() {
        dialog_register.show();
    }
    /**公告 */
    onNoticeShow() {
        dialog_notice.show();
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
        window.localStorage.setItem("lang", core.lang);
        location.reload();
    }

    onService() {
        ServiceUtil();
    }

    // scrollHandle() {
    //     this.categoryActive = -1;
    //     if (!this.$vuetify.breakpoint.mobile) {
    //         const len = this.pageData.lobbyIndex.length;
    //         for (let i = 0; i < len; i++) {
    //             const item = this.pageData.lobbyIndex[i];
    //             const div = document.getElementById(item.category.toString());
    //             if (div) {
    //                 const rect = div.getBoundingClientRect();
    //                 if (rect.top <= 250 && rect.bottom - 50 > 155) {
    //                     this.categoryActive = i;
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // }

    @Watch("myProxy.isOpenWalletMenu")
    onWatchMenu(val: boolean) {
        if (!val) {
            this.myProxy.isShowWalletTip = false;
        }
    }

    get is_show_commission() {
        return this.GamePlatConfig.config.is_show_commission;
    }
}
