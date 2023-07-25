import AbstractView from "@/core/abstract/AbstractView";
import Assets from "@/_skin005/assets/Assets";
import PageBlur from "@/_skin005/core/PageBlur";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class Activity extends AbstractView {
    @Prop() options!: any;
    @Prop({ default: true }) mini!: boolean;

    commonIcon = Assets.commonIcon;
    LangUtil = LangUtil;
    // expandedPanels = [0];
    list = {
        4: { name: "精彩活动", color: "pink", img_src: require("@/_skin005/assets/novigation/activity/exciting_activities.png") },
        7: { name: "每日签到", color: "purple", img_src: require("@/_skin005/assets/novigation/activity/sign_in.png") },
        // id1: { name: "幸运转盘", color: "red", img_src: require("@/_skin005/assets/novigation/activity/roulette.png") },
        // id2: { name: "有奖标枪", color: "blue", img_src: require("@/_skin005/assets/novigation/activity/javelin.png") },
        8: { name: "每日签到", color: "blue1", img_src: require("@/_skin005/assets/novigation/activity/promotion_reward.png") },
        9: { name: "奖励币任务", color: "red", img_src: require("@/_skin005/assets/novigation/activity/coin_task.png") },
    };

    // isFilterChange = false;

    // @Watch("isFilterChange")
    // filterChange(val: boolean) {
    //     if (this.$mobile) {
    //         PageBlur.blur_page(this.isFilterChange);
    //     } else PageBlur.blur_mainpage(this.isFilterChange);
    // }
    // setIsFilter(val: boolean) {
    //     this.isFilterChange = val;
    // }
    goCategory(item: any) {
        this.$emit("goCategory", item);
    }
}
