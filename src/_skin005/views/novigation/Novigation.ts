import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component, Vue } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/_skin005/assets/Assets";
import getProxy from "@/core/global/getProxy";
import LangConfig from "@/core/config/LangConfig";
import gsap, { Linear, Elastic } from "gsap";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GameConfig from "@/core/config/GameConfig";
import NovigationProxy from "./NovigationProxy";
import PageBlur from "@/_skin005/core/PageBlur";
import { getVersion, isSafari } from "@/core/global/Functions";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import SkinVariable from "@/_skin005/core/SkinVariable";
import Constant from "@/core/global/Constant";

@Component
export default class Novigation extends AbstractView {
    LangUtil = LangUtil;
    getVersion = getVersion;
    ModulesHelper = ModulesHelper;
    commonIcon = Assets.commonIcon;
    CategoryIcon = Assets.CategoryIcon;
    CategoryIcon_sel = Assets.CategoryIcon_sel;
    core = core;
    LangConfig = LangConfig;
    gameProxy = PanelUtil.getProxy_gameproxy;
    myProxy: NovigationProxy = getProxy(NovigationProxy);
    GamePlatConfig = GamePlatConfig;
    selfProxy = PanelUtil.getProxy_selfproxy;
    GameConfig = GameConfig;
    SkinVariable = SkinVariable;

    mounted() {
        if (!this.$mobile) {
            this.mini = this.myProxy.isminiMenu || false;
            this.Change();
        }
    }
    //基础菜单
    get menu() {
        const newlist = <any>[];
        const list = {
            0: { icon: "coin", icon_sel: "coin_sel", name: "币种介绍", id: 5, path: "page_introduce" },
            1: { icon: "chips", icon_sel: "chips_sel", name: "质押分红", id: 1, path: "page_bonus" },
            2: { icon: "extension", icon_sel: "extension_sel", name: "推广赚钱", id: 6, path: "commissions" },
            3: { icon: "water", icon_sel: "water_sel", name: "游戏返水", id: 2, path: "page_mine" },
            4: { icon: "swap", icon_sel: "swap_sel", name: "SWAP交易", id: 3, path: "page_swap" },
            5: { icon: "activity", icon_sel: "activity_sel", name: "精彩活动", id: 4, path: "promotions" },
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
        //精彩活动
        if (ModulesHelper.IsShow_ActivityDisplay()) {
            newlist.push(list[5]);
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
        if (!Constant.isIncludeGameRouter(this.routerPath)) {
            //console.log(" 导航 路由切换---","变为-1");
            this.myProxy.categoryActive = -1;
        }
    }

    /**传入 true 则显示  mini   如果传入  false 则显示 大图 */
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
        //console.log("图标点击-----");
        if (this.$mobile) {
            PanelUtil.appproxy.setNovigationPanelShow(false);
            return;
        }
        this.myProxy.isminiMenu = !this.myProxy.isminiMenu;
    }
    Change() {
        //if (this.bTween) return;
        if (isSafari()) {
            this.$nextTick(() => {
                const navbox = document.getElementsByClassName("navbox");
                //@ts-ignore
                if (navbox[0]) navbox[0].style.minWidth = (this.mini ? 60 : 188) + "px";
                const navscroll = document.getElementsByClassName("navscroll");
                //@ts-ignore
                if (navscroll[0]) navscroll[0].style.width = (this.mini ? 60 : 188) + "px";
            });
        } else {
            this.bTween = true;
            gsap.to(".navbox", {
                minWidth: this.mini ? 60 : 188,
                // duration: 0.3,
                // ease: Linear.easeNone,
                // onComplete: () => {
                //     this.bTween = false;
                // },
            });
            gsap.to(".navscroll", {
                width: this.mini ? 60 : 188,
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
            // if (this.mini)
            //     item.style.width = "calc(100vw - 100px)";
            // else
            //     item.style.width = "calc(100vw - 250px)";
            if (this.mini) {
                item.classList.remove("mainpage");
                item.classList.add("mainpage_mini");
            } else {
                item.classList.remove("mainpage_mini");
                item.classList.add("mainpage");
            }
        }

        const header_pc = document.getElementById("pc_header");
        if (header_pc) {
            if (this.mini) {
                header_pc.classList.remove("head_test");
                header_pc.classList.add("head_test_mini");
            } else {
                header_pc.classList.remove("head_test_mini");
                header_pc.classList.add("head_test");
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
            default:
                break;
        }
    }

    goCategory_game(id: any) {
        if (this.myProxy.categoryActive == id) return;
        console.log("----id--", id);
        if (this.$mobile) {
            PanelUtil.showNovigation(false);
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

    getChannelID() {
        return core.channel_id;
    }
    onLightChange() {
        console.log("明暗切换了");
        this.$nextTick(() => {
            this.resetPageSize();
        });
    }
}
