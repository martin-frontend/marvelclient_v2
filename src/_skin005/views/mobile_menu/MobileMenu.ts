import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { Prop, Watch, Component } from "vue-property-decorator";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import GameConfig from "@/core/config/GameConfig";
import LangConfig from "@/core/config/LangConfig";
@Component
export default class MobileMenu extends AbstractView {
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;
    GameConfig = GameConfig;
    gameProxy = PanelUtil.getProxy_gameproxy;
    get menuList() {
        const newlist = [];
        const list = <any>{
            0: { id: 0, mob_type: "home", name: LangUtil("首页"), icon: "home", path: "/" },
            1: { id: 1, mob_type: "football", name: LangUtil("足球"), icon: "soccer", path: "/page_game_soccer" },
            2: { id: 2, mob_type: "casino", name: LangUtil("娱乐城"), icon: "c16", path: "/page_game_list" },
            3: { id: 3, mob_type: "promotion", name: LangUtil("推广"), icon: "extension", path: "/commissions" },
            4: { id: 4, mob_type: "pledgeDividend", name: LangUtil("分红"), icon: "bouns", path: "/page_bonus" },
            5: { id: 5, mob_type: "", name: LangUtil("我的"), icon: "my_info", path: "/page_my_info" },
            6: { id: 6, mob_type: "", name: LangUtil("代理管理"), icon: "agentmenger", path: "/page_statistice_credit" },
            7: { id: 7, mob_type: "gameWater", name: LangUtil("返水"), icon: "water", path: "/page_mine" },
            8: { id: 8, mob_type: "cricket", name: LangUtil("板球"), icon: "cricket", path: "/cricket" },
            9: { id: 9, mob_type: "charge", name: LangUtil("充值"), icon: "water", path: "/page_recharge" },
        };

        if (GameConfig.config.PhoneMenu && GameConfig.config.PhoneMenu.length > 0) {
            const keys = Object.keys(list);

            for (let index = 0; index < GameConfig.config.PhoneMenu.length; index++) {
                const element = GameConfig.config.PhoneMenu[index];
                if (element.trim()) {
                    for (let n = 0; n < keys.length; n++) {
                        const el = list[keys[n]];
                        if (element == el.mob_type) {
                            newlist.push(el);
                        }
                    }
                }
            }
        } else {
            if (ModulesHelper.IsShow_FootBall()) {
                newlist.push(list[1]);
            }

            if (this.isShowCricket) {
                newlist.push(list[8]);
            }
            newlist.push(list[2]);

            //是否显示 游戏反水
            if (ModulesHelper.IsShow_GameWater()) {
                newlist.push(list[7]);
            }
            //是否显示 游戏反水
            if (ModulesHelper.IsShow_Promotion()) {
                newlist.push(list[3]);
            }
            //质押分红
            if (ModulesHelper.IsShow_PledgeDividend()) {
                newlist.push(list[4]);
            }
        }

        //代理管理
        if (ModulesHelper.IsShow_AgentManager()) {
            newlist.push(list[6]);
        }
        //我的
        newlist.push(list[5]);
        return newlist;
    }

    routerPath = this.$router.app.$route.path;
    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
    }

    onItemClick(item: any) {
        if (this.isActiveItem(item)) return;
        switch (item.id) {
            case 0:
                PanelUtil.openpage_home();
                break;
            case 1:
                PanelUtil.openpage_soccer();
                break;
            case 2:
                PanelUtil.openpage_gamelist();
                break;
            case 3:
                PanelUtil.openpage_extension();
                break;
            case 4:
                PanelUtil.openpage_bonus();
                break;
            case 5:
                PanelUtil.openpage_my_info();
                break;
            case 6:
                PanelUtil.openpage_statist_credit();
                break;
            case 7:
                PanelUtil.openpage_mine();
                break;
            case 8:
                PanelUtil.openpage_soccer_cricket();
                break;
            case 9:
                PanelUtil.openpage_recharge();
                break;
        }
    }

    //是否显示 板球
    public get isShowCricket(): boolean {
        if (GameConfig.config.CricketVendorId && GameConfig.config.CricketVendorId != 0) {
            return true;
        }
        return false;
    }

    /**是否为板球 */
    public get isCricket(): boolean {
        console.log("---- 数据 变化------");
        return !!this.GameConfig.config.CricketVendorId && this.gameProxy.currGame.vendor_id == this.GameConfig.config.CricketVendorId;
    }

    isActiveItem(item: any) {
        if (!item) return false;

        if (item.id == 8) {
            //板球的判断
            return this.routerPath.includes(item.path) && this.isCricket;
        }else if(item.id == 0)
        {
            return this.routerPath == "/" + LangConfig.getRouterLang();
        }
         else if (item.id == 1) {
            return this.routerPath.includes(item.path) && !this.isCricket;
        } else if (item.id == 2) {
            return !(
                !this.routerPath.includes("page_game_list") &&
                !this.routerPath.includes("sports") &&
                !this.routerPath.includes("live-casino-online") &&
                !this.routerPath.includes("blockchain-games") &&
                !this.routerPath.includes("fishing-games") &&
                !this.routerPath.includes("slots-games") &&
                !this.routerPath.includes("lottery-games") &&
                !this.routerPath.includes("cards-games")
            );
        } else return this.routerPath.includes(item.path);
    }
}
