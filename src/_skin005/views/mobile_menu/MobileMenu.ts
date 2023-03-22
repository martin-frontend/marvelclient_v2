import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { Prop, Watch, Component } from "vue-property-decorator";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import GameConfig from "@/core/config/GameConfig";
@Component
export default class MobileMenu extends AbstractView {
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;
    GameConfig = GameConfig;
    gameProxy = PanelUtil.getProxy_gameproxy;
    get menuList() {

        const newlist = [];
        const list = {
            0: { id: 0, name: LangUtil("首页"), icon: "home", path: "/" },
            1: { id: 1, name: LangUtil("足球"), icon: "soccer", path: "/page_game_soccer" },
            2: { id: 2, name: LangUtil("娱乐城"), icon: "c16", path: "/page_game_list" },
            3: { id: 3, name: LangUtil("推广"), icon: "extension", path: "/page_extension" },
            4: { id: 4, name: LangUtil("分红"), icon: "bouns", path: "/page_bonus" },
            5: { id: 5, name: LangUtil("我的"), icon: "my_info", path: "/page_my_info" },
            6: { id: 6, name: LangUtil("代理管理"), icon: "agentmenger", path: "/page_statistice_credit" },
            7: { id: 7, name: LangUtil("返水"), icon: "water", path: "/page_mine" },
            8: { id: 8, name: LangUtil("板球"), icon: "cricket", path: "/page_game_soccer_cricket" },
        };
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
        return (!!this.GameConfig.config.CricketVendorId && this.gameProxy.currGame.vendor_id == this.GameConfig.config.CricketVendorId)
    }

    isActiveItem(item: any) {
        if (!item) return false;

        if (item.id == 8) //板球的判断
        {
            return this.routerPath.includes(item.path) && this.isCricket;
        }
        else if (item.id == 1) {
            return this.routerPath.includes(item.path) && !this.isCricket;
        }
        else
            return this.routerPath.includes(item.path);
    }
}
