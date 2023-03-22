import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class GameItem extends AbstractView {
    LangUtil = LangUtil;

    @Prop() item!: any;
    @Prop({ default: false }) useMenuData!: Boolean;
    @Prop() width!: number;
    @Prop() height!: number;

    getIcon(item: any) {
        return this.useMenuData ? item.entrance_icon : item.icon;
    }

    get getTag() {
        if (!this.item.tags) return "";
        if (this.item.tags.length == 0) return "";
        // 1-新 2-火热
        return this.item.tags[0] == 1 ? require("@/assets/tag/new.png") : require("@/assets/tag/hot.png");
    }

    getBoxClass() {
        if (this.$vuetify.breakpoint.mobile) {
            return "";
        } else {
            let classStr = "box";
            if (this.item) {
                classStr += " box-height";
                if (this.item.status != 1) {
                    classStr += " filter-gray";
                }
            }
            // if (!this.$vuetify.breakpoint.mobile) {
            classStr += " box_margin";
            // } else {
            //     classStr += " box_margin_mob";
            // }
            return classStr;
        }
    }
    get isNomalState() {
        if (!this.item) return true;
        return this.item.status == 1;
    }
    goGamePlay() {
        if (this.item) {
            PanelUtil.openpage_soccer(this.item);
        }
    }

    @Watch("item")
    filterChange(val: boolean) { }

    onClickItem()
    {
        
    }
}
