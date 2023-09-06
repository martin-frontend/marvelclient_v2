import AbstractView from "@/core/abstract/AbstractView";
import Assets from "@/_skin005/assets/Assets";
import PageBlur from "@/_skin005/core/PageBlur";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";

@Component
export default class Activity extends AbstractView {
    @Prop() options!: any;
    @Prop({ default: true }) mini!: boolean;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    red_dot_tips = this.selfProxy.red_dot_tips;
    commonIcon = Assets.commonIcon;
    LangUtil = LangUtil;
    // expandedPanels = [0];
    list = {
        4: {
            name: "精彩活动",
            color: "gary",
            icon: "gift",
        },
        7: {
            name: "每日签到",
            color: "green",
            svga: "sign",
        },
        8: { name: "推广奖励", color: "blue", svga: "trumpet" },
        9: { name: "奖励币任务", color: "purple", svga: "coin" },
        105: { name: "彩球活动", color: "yellow", svga: "caiqiu" },
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

    resolveSvgaSrc(name: any) {
        return "svga/" + name + ".svga";
    }

    isShowActive_menu(item: any) {
        if (!item.path || !item.path.trim()) return false;
        return this.$route.path.includes(item.path);
    }
}
