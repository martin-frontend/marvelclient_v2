import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageActivityMediator from "../mediator/PageActivityMediator";
import PageActivityProxy from "../proxy/PageActivityProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_activity_detail from "@/_skin004/views/dialog_activity_detail";
import dialog_activity_7days from "../../dialog_activity_7days";
import dialog_activity_point_spin from "../../dialog_activity_point_spin";
import dialog_activity_rank from "../../dialog_activity_rank";

@Component
export default class PageActivity extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageActivityProxy = this.getProxy(PageActivityProxy);
    pageData = this.myProxy.pageData;
    categoryData = this.myProxy.pageData.categoryData;

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
        console.log("--", tabIndex);
        console.log("--this.categoryData---", this.myProxy.pageData.categoryData);
        console.log("当前使用的数据", this.myProxy.pageData.categoryData[tabIndex]);
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
        console.warn("---打开详情---", item);
        if (item && item.award_type && item.award_type == 16) {
            dialog_activity_7days.show(item);
            return;
        }
        if (item.model_type == 14) {
            dialog_activity_point_spin.show(item.id);
            return;
        }
        if (item.model_type == 15) {
            dialog_activity_rank.show(item.id);
            return;
        }
        dialog_activity_detail.show(item);
    }
}
