import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageActivityMediator from "../mediator/PageActivityMediator";
import PageActivityProxy from "../proxy/PageActivityProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import GameConfig from "@/core/config/GameConfig";
import SkinVariable from "@/_skin030/core/SkinVariable";
import ModulesHelper from "@/_skin030/core/ModulesHelper";
import { changeDateShow } from "@/core/global/Functions";

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
        this.$nextTick(() => {
            this.onCategoryChange(0);
        });
    }

    public get curActivityData(): any {
        const { tabIndex } = this.pageData;
        // console.log("--",tabIndex);
        // console.log("--this.categoryData---",this.myProxy.pageData.categoryData);
        // console.log("当前使用的数据",this.myProxy.pageData.categoryData[tabIndex]);
        return this.myProxy.pageData.categoryData[tabIndex];
    }

    //计算分类的下表
    getCateIndex(item: any) {
        for (let index = 0; index < this.myProxy.pageData.categoryData.length; index++) {
            const element = this.myProxy.pageData.categoryData[index];
            if (element.title == item.activity_category) return this.getCategoryColor(index);
        }
        return this.getCategoryColor(0);
    }
    getCategoryColor(index: number) {
        switch (index) {
            case 1:
                return "#3ac167";
            case 2:
                return "#6f3ac1";
            case 3:
                return "#f00";
        }
    }
    getCategoryImg(index: number) {
        switch (index) {
            case 1:
                return require("@/_skin030/assets/activity/catagory_sport.png");
            case 2:
                return require("@/_skin030/assets/activity/catagory_game.png");
            default:
                return "";
        }
    }
    onCategoryChange(index: number) {
        this.myProxy.pageData.tabIndex = index;
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
        if (this.myProxy.activityDetailData && this.myProxy.activityDetailData[item.id]) {
            PanelUtil.openpanel_activity_detail(this.myProxy.activityDetailData[item.id]);
        } else {
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
        return 201;
        if (this.$vuetify.breakpoint.width < 1400) {
            return 200;
        }
        // else if (this.$vuetify.breakpoint.width > 1280) {
        //     return 265;
        // }
        return 230;
        // return 240;
    }
    getDate(str: string, isChange: boolean = true) {
        return changeDateShow(str, isChange);
    }
    onClickGetIt(item: any) {
        console.log("点击 立即获取", item);
        PanelUtil.openpanel_recharge();
    }
    onClickRules(item: any) {
        console.log("点击 规则", item);
    }
    get img_width() {
        return !this.$mobile ? 388 : 317;
    }
}
