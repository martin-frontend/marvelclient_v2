import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import ModulesHelper from "@/_skin030/core/ModulesHelper";
import NavigationProxy from "../../NavigationProxy";
import getProxy from "@/core/global/getProxy";
import GameConfig from "@/core/config/GameConfig";
import PanelUtil from "@/_skin030/core/PanelUtil";
import LangConfig from "@/core/config/LangConfig";
import NavigationCommonData from "../../NavigationCommonData";

@Component
export default class NavigationHome extends AbstractView {
    LangUtil = LangUtil;
    myProxy: NavigationProxy = getProxy(NavigationProxy);
    gameProxy = PanelUtil.getProxy_gameproxy;
    core = core;
    LangConfig = LangConfig;

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
    /**其他导航的选项 */
    get navigation_menu() {
        return NavigationCommonData.Instance.navigation_menu;
    }
    /**其他导航的选项 */
    get navigation_other_menu() {
        return NavigationCommonData.Instance.navigation_other_menu;
    }

    get isShowPromotionReward() {
        // @ts-ignore
        return this.myProxy.activityData.find((item) => item.id == this.promotion_reward_model_id.id) != undefined;
    }
    goCategory(item: any, itemData: any) {
        this.myProxy.categoryActive = 0;
        NavigationCommonData.Instance.goCategory(item, itemData);
    }

    onNavigationClick(item: any) {
        NavigationCommonData.Instance.onNavigationClick(item);
    }
    private onChangeLang(item: any) {
        this.core.lang = item;
    }
    onChangePanel() {
        this.myProxy.setMiniMenu(false);
    }
    get isMiniMenu() {
        return this.myProxy.isminiMenu;
    }
    /**当游戏分类 被点击 */
    onGameCategoryClick(item: any) {
        const id = NavigationCommonData.getItemCategory(item);
        if (this.myProxy.categoryActive == id) return;
        if (this.$mobile) {
            PanelUtil.showNavigation(false);
        }
        this.myProxy.categoryActive = id;
        PanelUtil.openpanel_gamelist(id);
    }
}
