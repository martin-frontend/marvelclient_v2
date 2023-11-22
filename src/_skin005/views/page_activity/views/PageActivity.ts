import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageActivityMediator from "../mediator/PageActivityMediator";
import PageActivityProxy from "../proxy/PageActivityProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GameConfig from "@/core/config/GameConfig";
import SkinVariable from "@/_skin005/core/SkinVariable";
import ModulesHelper from "@/_skin005/core/ModulesHelper";

@Component
export default class PageActivity extends AbstractView {
    LangUtil = LangUtil;
    SkinVariable = SkinVariable;
    ModulesHelper = ModulesHelper;
    myProxy: PageActivityProxy = this.getProxy(PageActivityProxy);
    pageData = this.myProxy.pageData;
    categoryData = this.myProxy.pageData.categoryData;
    core = core;

    get promotion_reward_model_id() {
        return (
            GameConfig.config.promotion_reward_model_id ?? {
                id: 0,
                rule_id: 0,
            }
        );
    }

    constructor() {
        super(PageActivityMediator);
    }
    destroyed() {
        super.destroyed();
    }
    mounted() {
        this.myProxy.api_plat_activity();
    }

    public get curActivityData(): any {
        const { tabIndex } = this.pageData;
        // console.log("--",tabIndex);
        // console.log("--this.categoryData---",this.myProxy.pageData.categoryData);
        // console.log("当前使用的数据",this.myProxy.pageData.categoryData[tabIndex]);
        return this.myProxy.pageData.categoryData[tabIndex];
    }

    /**图标时间选择 */
    onTimeChange(val: any) {
        //this.pageData.tabIndex = parseInt(val);
        this.onTabClick(this.pageData.tabIndex);
    }
    onTabClick(idx: number) {
        this.pageData.tabIndex = idx;

        // if ( this.pageData.tabIndex == 0)
        // {
        //     this.onEnterHomePage();
        // }
    }
    onItemClick(item: any) {
        console.log("收到点击。。。", item);
        //PanelUtil.openpanel_activity_detail(item);

        // 推广奖励
        if (item.id == this.promotion_reward_model_id.id) {
            PanelUtil.openpanel_promotionreward();
            return;
        }
        if (item.id == PanelUtil.getProxy_novigation.ballAwardId) {
            PanelUtil.openpage_activity_slots(null);
            return;
        }
        if (PanelUtil.isCanJump(item)) {
            PanelUtil.isCanJump(item, true);
            return;
        }
        if (this.myProxy.activityDetailData && this.myProxy.activityDetailData[item.id]) {
            console.warn("line 79");
            PanelUtil.openpanel_activity_detail(this.myProxy.activityDetailData[item.id]);
        } else {
            console.warn("line 82");
            PanelUtil.showAppLoading(true);
            this.myProxy.api_plat_activity_var(item.id);
        }
    }

    public get viewWidth(): number {
        if (this.$mobile) {
            if (this.$vuetify.breakpoint.width > 800) {
                return 150;
            }
            return 120;
        }
        if (this.$vuetify.breakpoint.width < 1400) {
            return 200;
        }
        // else if (this.$vuetify.breakpoint.width > 1280) {
        //     return 265;
        // }
        return 230;
        // return 240;
    }
}
