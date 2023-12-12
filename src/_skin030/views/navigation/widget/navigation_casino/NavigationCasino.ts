import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import NavigationProxy from "../../NavigationProxy";
import getProxy from "@/core/global/getProxy";
import LangConfig from "@/core/config/LangConfig";
import GameConfig from "@/core/config/GameConfig";
import ModulesHelper from "@/_skin030/core/ModulesHelper";
import PanelUtil from "@/_skin030/core/PanelUtil";
import NavigationCommonData from "../../NavigationCommonData";

@Component
export default class NavigationCasino extends AbstractView {
    LangUtil = LangUtil;
    myProxy: NavigationProxy = getProxy(NavigationProxy);
    core = core;
    LangConfig = LangConfig;
    gameProxy = PanelUtil.getProxy_gameproxy;
    /**其他导航的选项 */
    get navigation_menu() {
        return NavigationCommonData.Instance.navigation_menu;
    }
    /**其他导航的选项 */
    get navigation_other_menu() {
        return NavigationCommonData.Instance.navigation_other_menu;
    }

    onNavigationClick(item: any) {
        NavigationCommonData.Instance.onNavigationClick(item);
    }
    private onChangeLang(item: any) {
        this.core.lang = item;
    }
    /**展开折叠的面板 被点击 展开或者 收缩的时候 */
    onChangePanel() {
        this.myProxy.setMiniMenu(false);
    }
    /**是否为 mini 状态 */
    get isMiniMenu() {
        return this.myProxy.isminiMenu;
    }

    /**游戏中的几个按钮 */
    get navigation_game_menu_history() {
        const recents = { 7: { name: "近期游戏", id: 7, icon: "ky_recents", action: "opencasino_history" } };
        const challenge = { 8: { name: "挑战", id: 8, icon: "ky_challenges", action: "opencasino_challenges" } };
        const list = {
            // 6: { name: "收藏夹", id: 6, icon: "ky_levle_none", action: "opencasino_history" },
            ...(ModulesHelper.IsShow_GameHistory() ? recents : {}),
            ...(ModulesHelper.IsShow_Challenge() ? challenge : {}),
        };

        return list;
    }
    /**正常的游戏分类 */
    get navigation_game_type(): core.PlatLobbyIndexVO[] {
        return this.gameProxy.lobbyMenuIndex;
    }
    /**游戏供应商 */
    get navigation_game_vendor() {
        const list = {
            6: { name: "游戏提供商", id: 6, icon: "ky_provider", action: "opencasino_vendor", path: "vendor" },
        };

        return list;
    }
    get promotion_reward_model_id() {
        return (
            GameConfig.config.promotion_reward_model_id ?? {
                id: 0,
                rule_id: 0,
            }
        );
    }
    /**是否显示精彩活动 */
    get isShowPromotion() {
        return ModulesHelper.IsShow_ActivityDisplay();
    }
    get activity_item() {
        return NavigationCommonData.Instance.activity_item;
    }

    get isShowPromotionReward() {
        // @ts-ignore
        return this.myProxy.activityData.find((item) => item.id == this.promotion_reward_model_id.id) != undefined;
    }
    get activity_menu() {
        const newlist = <any>[];
        const list = {
            // 5: { name: "精彩活动", id: 4, path: "promotions" },
            6: { name: "每日签到", id: 7, icon: "ky_dailysign", path: "" },
            7: { name: "推广奖励", id: 8, icon: "gift", path: "" },
            8: { name: "奖励币任务", id: 9, icon: "ky_cointask", path: "page_coin_task" },
            5: { name: "查看全部", id: 4, icon: "ky_promotion", path: "promotions" },
        };
        //精彩活动
        // if (ModulesHelper.IsShow_ActivityDisplay()) {
        //     newlist.push(list[5]);
        // }
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
        newlist.push(list[5]);
        return newlist;
    }
    goCategory(item: any, itemData: any) {
        this.myProxy.categoryActive = 0;
        NavigationCommonData.Instance.goCategory(item, itemData);
    }
    /**当游戏分类 被点击 */
    onGameCategoryClick(item: any) {
        const id = NavigationCommonData.getItemCategory(item);
        if (this.myProxy.categoryActive == id) return;
        console.log("----id--", id);
        if (this.$mobile) {
            PanelUtil.showNavigation(false);
        }
        this.myProxy.categoryActive = id;
        PanelUtil.openpanel_gamelist(id);
    }
}
