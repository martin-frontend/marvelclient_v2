import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component, Vue } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/_skin030/assets/Assets";
import getProxy from "@/core/global/getProxy";
import LangConfig from "@/core/config/LangConfig";
import gsap, { Linear, Elastic } from "gsap";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin030/core/PanelUtil";
import GameConfig from "@/core/config/GameConfig";
import NavigationProxy from "./NavigationProxy";
import PageBlur from "@/_skin030/core/PageBlur";
import { getVersion, isSafari } from "@/core/global/Functions";
import ModulesHelper from "@/_skin030/core/ModulesHelper";
import SkinVariable from "@/_skin030/core/SkinVariable";
import Constant from "@/core/global/Constant";
import NavigationMediator from "./NavigationMediator";

@Component
export default class Navigation extends AbstractView {
    LangUtil = LangUtil;
    getVersion = getVersion;
    ModulesHelper = ModulesHelper;
    commonIcon = Assets.commonIcon;
    CategoryIcon = Assets.CategoryIcon;
    CategoryIcon_sel = Assets.CategoryIcon_sel;
    core = core;
    LangConfig = LangConfig;
    gameProxy = PanelUtil.getProxy_gameproxy;
    myProxy: NavigationProxy = getProxy(NavigationProxy);
    GamePlatConfig = GamePlatConfig;
    selfProxy = PanelUtil.getProxy_selfproxy;
    GameConfig = GameConfig;
    SkinVariable = SkinVariable;
    activityProxy = PanelUtil.getProxy_get_pageActivityProxy;

    get promotion_reward_model_id() {
        return (
            GameConfig.config.promotion_reward_model_id ?? {
                id: 0,
                rule_id: 0,
            }
        );
    }

    constructor() {
        super(NavigationMediator);
    }
    destroyed() {
        super.destroyed();
    }

    mounted() {
        this.myProxy.api_plat_activity();
        if (!this.$mobile) {
            this.mini = this.myProxy.isminiMenu || false;
            this.Change();
        }
        //console.log("导航打开 ");
        this.onWatchRouter();
    }
    //基础菜单
    get menu() {
        const newlist = <any>[];
        const list = {
            0: { icon: "coin", icon_sel: "coin_sel", name: "币种介绍", id: 5, path: "page_introduce" },
            1: { icon: "chips", icon_sel: "chips_sel", name: "质押分红", id: 1, path: "page_bonus" },
            2: { icon: "extension", icon_sel: "extension_sel", name: "推广赚钱", id: 6, path: "commissions" },
            3: { icon: "water", icon_sel: "water_sel", name: "游戏返水", id: 2, path: "vip_rewards" },
            4: { icon: "swap", icon_sel: "swap_sel", name: "SWAP交易", id: 3, path: "page_swap" },
            5: { icon: "agentmenger", icon_sel: "agentmenger", name: "推广代理", id: 10, path: "page_promotion_statistics" },
        };
        //币种介绍
        if (ModulesHelper.IsShow_CoinIntroduce()) {
            newlist.push(list[0]);
        }
        //质押分红
        if (ModulesHelper.IsShow_PledgeDividend()) {
            newlist.push(list[1]);
        }
        //推广赚钱
        if (ModulesHelper.IsShow_Promotion()) {
            newlist.push(list[2]);
        }
        //游戏返水
        if (ModulesHelper.IsShow_GameWater()) {
            newlist.push(list[3]);
        }
        //SWAP交易
        if (ModulesHelper.IsShow_Swap()) {
            newlist.push(list[4]);
        }
        if (this.selfProxy.userInfo.is_show_agent_statistic === 1) {
            newlist.push(list[5]);
        }
        return newlist;
    }

    get activity_menu() {
        const newlist = <any>[];
        const list = {
            5: { name: "精彩活动", id: 4, path: "promotions" },
            6: { name: "每日签到", id: 7, path: "" },
            // id1 :{ name: "幸运转盘", id: id1, path: "" },
            // id2 :{ name: "有奖标枪", id: id2, path: "" },
            7: { name: "推广奖励", id: 8, path: "" },
            8: { name: "奖励币任务", id: 9, path: "page_coin_task" },
        };
        //精彩活动
        if (ModulesHelper.IsShow_ActivityDisplay()) {
            newlist.push(list[5]);
        }
        //每日签到
        if (ModulesHelper.IsShow_DailysignDisplay()) {
            newlist.push(list[6]);
        }
        //推广奖励
        if (this.isShowPromotionReward) {
            newlist.push(list[7]);
        }
        //奖励币任务
        if (ModulesHelper.IsShow_CoinTaskDisplay()) {
            newlist.push(list[8]);
        }

        return newlist;
    }
    //抽屉状态
    mini = false;
    bTween = false;
    //当前路由
    routerPath = this.$router.app.$route.path;

    //是否为新的 需要 菜单栏
    public get isNeetMenu(): boolean {
        return true;
        //return GameConfig.config.menuType == "1";
    }

    public get categoryActive(): number {
        return this.myProxy.categoryActive;
    }

    public get lobbyMenuIndex(): core.PlatLobbyIndexVO[] {
        if (this.isNeetMenu) {
            return this.gameProxy.lobbyMenuIndex;
        } else return this.gameProxy.lobbyIndex;
    }

    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
        //通过 router 或者 当前的 游戏id
        const categoryId = Constant.getVendorByRouter(this.routerPath);
        if (this.myProxy.categoryActive == categoryId) {
            return;
        }
        //两个不相同
        if (categoryId != -1) {
            this.goCategory_game(categoryId);
        } else {
            this.myProxy.categoryActive = categoryId;
        }
    }

    /**传入 true 则显示  mini   如果传入  false 则显示大图 */
    setMiniChange(ismini: boolean) {
        if (this.$mobile) return;
        this.mini = !ismini;
        this.onMiniChange();
    }
    @Watch("myProxy.isminiMenu")
    miniChange(val: boolean) {
        if (this.$mobile) return;
        this.mini = this.myProxy.isminiMenu;
        this.Change();
    }
    onMiniChange() {
        if (this.$mobile) {
            PanelUtil.appproxy.setNavigationPanelShow(false);
            return;
        }
        this.myProxy.isminiMenu = !this.myProxy.isminiMenu;
        console.log("图标点击-----", this.myProxy.isminiMenu);
    }
    Change() {
        //if (this.bTween) return;
        if (isSafari()) {
            this.$nextTick(() => {
                const navbox = document.getElementsByClassName("navbox");
                //@ts-ignore
                if (navbox[0]) navbox[0].style.minWidth = (this.mini ? 60 : 240) + "px";
                const navscroll = document.getElementsByClassName("navscroll");
                //@ts-ignore
                if (navscroll[0]) navscroll[0].style.width = (this.mini ? 60 : 240) + "px";
            });
        } else {
            this.bTween = true;
            gsap.to(".navbox", {
                minWidth: this.mini ? 60 : 240,
                // duration: 0.3,
                // ease: Linear.easeNone,
                // onComplete: () => {
                //     this.bTween = false;
                // },
            });
            gsap.to(".navscroll", {
                width: this.mini ? 60 : 240,
                // duration: 0.3,
                // ease: Linear.easeNone,
                // onComplete: () => {
                //     this.bTween = false;
                // },
            });
        }

        this.resetPageSize();
    }

    resetPageSize() {
        if (this.$mobile) return;
        const item = document.getElementById("mainpage");
        if (item) {
            console.log("修改");
            if (this.mini) {
                item.classList.remove("mainpage");
                item.classList.add("mainpage_mini");
            } else {
                item.classList.remove("mainpage_mini");
                item.classList.add("mainpage");
            }
        }
    }
    /**切换语言 */
    @Watch("core.lang")
    onWatchLang(value: any, oldValue: any) {
        const path = this.$router.currentRoute.path;
        window.localStorage.setItem("lang", core.lang);

        const currLang = Vue.prePath.split("/").reverse()[0];
        const newPath = path.replace(currLang, LangConfig.getRouterLang());
        this.$router.replace(newPath);
    }

    getItemCategory(item: any) {
        if (item.category) {
            return item.category;
        } else {
            return item.vendor_type;
        }
    }
    getItemCategoryName(item: any) {
        if (item.category_name) {
            return item.category_name;
        } else {
            return item.vendor_type_name;
        }
    }
    goCategory(item: any) {
        console.log("收到点击");
        this.myProxy.categoryActive = 0;
        switch (item.id) {
            case 1:
                PanelUtil.openpage_bonus();
                break;
            case 2:
                PanelUtil.openpage_mine();
                break;
            case 3:
                PanelUtil.openpage_swap();
                break;
            case 4:
                PanelUtil.openpanel_activity();
                break;
            case 5:
                PanelUtil.openpage_introduce();
                break;
            case 6:
                PanelUtil.openpage_extension();
                break;
            case 7:
                PanelUtil.openpanel_dailysign();
                break;
            case 8:
                PanelUtil.openpanel_promotionreward();
                break;
            case 9:
                PanelUtil.openpanel_coin_task();
                break;
            case 10:
                PanelUtil.openpage_promotion_statistic();
                break;
            default:
                break;
        }
    }

    goCategory_game(id: any) {
        if (this.myProxy.categoryActive == id) return;
        console.log("----id--", id);
        if (this.$mobile) {
            PanelUtil.showNavigation(false);
        }
        this.myProxy.categoryActive = id;
        PanelUtil.openpanel_gamelist(id);
    }
    isFilterChange = false;
    @Watch("isFilterChange")
    filterChange(val: boolean) {
        if (this.$mobile) {
            return;
        }
        PageBlur.blur_mainpage(this.isFilterChange);
    }
    setIsFilter(val: boolean) {
        this.isFilterChange = val;
    }

    filterArr = <any>{};
    setFilters(index: any, val: boolean) {
        if (!this.ModulesHelper.IsShow_pcMenuTip()) return;
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

    isShowActive(item: any) {
        let isShow = false;

        if (this.categoryActive == this.getItemCategory(item)) isShow = true;

        if (this.myProxy.isMenuOpen[item.vendor_type] && this.myProxy.isMenuOpen[item.vendor_type] == true) isShow = true;

        return isShow;
    }

    isShowActive_menu(item: any) {
        if (!item.path || !item.path.trim()) return false;

        return this.routerPath.includes(item.path);
    }
    getChannelID() {
        return core.channel_id;
    }
    onLightChange() {
        console.log("明暗切换了");
        this.$nextTick(() => {
            this.resetPageSize();
        });
    }

    get isShowPromotionReward() {
        // @ts-ignore
        return this.myProxy.activityData.find((item) => item.id == this.promotion_reward_model_id.id) != undefined;
    }

    openTelegram() {
        window.open(LangUtil("telegram链结"));
    }

    goCasino() {
        // PanelUtil.openpanel_gamelist(16);
        // PanelUtil.openpage_home();
        PanelUtil.openpage_casino_lobby();
    }

    /**查询条件 */
    listQuery = {
        plat_id: core.plat_id,
        vendor_type: 0,
        vendor_id: 0,
        page_count: 1,
        page_size: 30,
    };

    clearListQuery() {
        Object.assign(this.listQuery, {
            plat_id: core.plat_id,
            vendor_type: 0,
            vendor_id: 0,
            page_count: 1,
            page_size: 30,
        });
    }

    setQueryData(vendor_type: number, vendor_id: number = 0) {
        this.clearListQuery();
        this.listQuery.vendor_type = vendor_type;
        this.listQuery.vendor_id = vendor_id;
    }

    get tableMenu(): any {
        return PanelUtil.getProxy_gameproxy.lobbyMenuIndex;
    }

    get getCurMenuData() {
        if (!this.tableMenu) return [];
        if (!this.listQuery.vendor_type) {
            return [];
        }
        const keys = Object.keys(this.tableMenu);
        for (let index = 0; index < keys.length; index++) {
            //@ts-ignore
            const element = this.tableMenu[keys[index]];
            if (element.vendor_type == this.listQuery.vendor_type) {
                return element.list;
            }
        }
        return [];
    }

    goSports() {
        this.setQueryData(64);
        // PanelUtil.openpanel_gamelist_sport(64);
        // PanelUtil.openpage_home();
        PanelUtil.openpage_soccer(this.getCurMenuData[0]);
    }
    /**导航栏的类型 */
    get navigation_type() {
        if (this.isCasinoActive) return 2;
        if (this.isSportsActive) return 3;

        return 1;
    }
    /** 游戏大厅是否在活动 */
    get isCasinoActive(): boolean {
        return Constant.isIncludeGameRouter(this.$route.path);
    }
    /**体育大厅是否在活动 */
    get isSportsActive(): boolean {
        // return false;
        return Constant.isIncludeSportRouter(this.$route.path);
    }
}
