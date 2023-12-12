import ModulesHelper from "@/_skin030/core/ModulesHelper";
import PanelUtil from "@/_skin030/core/PanelUtil";
import GameConfig from "@/core/config/GameConfig";
import LangUtil from "@/core/global/LangUtil";
import ServiceUtil from "../../core/global/ServiceUtil";

/**
 * 导航的通用数据
 */
export default class NavigationCommonData {
    private static _instance: NavigationCommonData;
    public static get Instance() {
        if (!this._instance) {
            this._instance = new NavigationCommonData();
        }
        return this._instance;
    }

    get activity_item() {
        return { name: "精彩活动", id: 4, icon: "ky_promotion", path: "promotions" };
    }
    /**其他导航的选项 */
    get navigation_menu() {
        const newlist = <any>[];
        const list = {
            // 5: { name: "精彩活动", id: 4, path: "promotions" },
            6: { name: "联盟计划", id: 7, icon: "ky_affiliate", action: "openpage_extension", path: "commissions" },
            7: { name: "vip俱乐部", id: 8, icon: "ky_vip", action: "openpage_mine", path: "vip_rewards" },
            // 8: { name: "博客", id: 9, icon: "ky_promotion", action: "" },
            // 5: { name: "论坛", id: 4, icon: "ky_promotion", action: "" },
        };
        return list;
    }
    /**其他导航的选项 */
    get navigation_sport() {
        const newlist = <any>[];
        const list = {
            // 5: { name: "精彩活动", id: 4, path: "promotions" },
            6: { name: "联盟计划-sport", id: 7, icon: "ky_affiliate", action: "openpage_extension" },
            7: { name: "vip俱乐部-sport", id: 8, icon: "ky_vip", action: "openpage_mine" },
            // 8: { name: "博客-sport", id: 9, icon: "ky_promotion", action: "" },
            // 5: { name: "论坛-sport", id: 4, icon: "ky_promotion", action: "" },
        };
        return list;
    }

    /**其他导航的选项 */
    get navigation_other_menu() {
        const newlist = <any>[];
        const list = {
            // 6: { name: "负责任博彩", id: 7, icon: "ky_promotion", action: "openpanel_contract" },
            7: { name: "在线支持", id: 9, icon: "ky_support", action: "openpanel_contactUtil" },
        };
        return list;
    }
    /**点击执行 */
    onNavigationClick(item: any) {
        console.log("点击导航---", item);
        const obj = {
            open_mode: 1,
            open_mode_url: LangUtil(item.action),
        };
        if (PanelUtil.isCanJump(obj)) {
            PanelUtil.jumpTo(obj);
        }
    }

    goCategory(item: any, itemData: any) {
        console.log("收到点击");
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

    /**获取游戏的分类 */
    static getItemCategory(item: any): number {
        if (item.category) {
            return item.category;
        } else {
            return item.vendor_type;
        }
    }
    /**获取游戏展示的名字 */
    static getItemCategoryName(item: any) {
        if (item.category_name) {
            return item.category_name;
        } else {
            return item.vendor_type_name;
        }
    }
}
