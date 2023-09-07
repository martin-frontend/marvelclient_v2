import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import SkinVariable from "@/_skin005/core/SkinVariable";
import GameProxy from "@/proxy/GameProxy";

@Component
export default class GameItem extends AbstractView {
    LangUtil = LangUtil;

    @Prop() item!: any;
    @Prop({ default: false }) useMenuData!: Boolean;
    @Prop() width!: number;
    @Prop() height!: number;

    @Prop({ default: false }) isPageHome!: Boolean;
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
        if (this.$mobile) {
            return "";
        } else {
            let classStr = "box";
            if (this.item) {
                classStr += " box-height";
                if (this.item.status != 1) {
                    classStr += " filter-gray";
                }
            }
            // if (!this.$mobile) {
            classStr += " box_margin";
            // } else {
            //     classStr += " box_margin_mob";
            // }
            return classStr;
        }
    }
    get title_height(): number {
        if (this.height) {
            return this.height / 3.7;
        }
        if (!this.$mobile) {
            return 44;
        }
        if (!this.isPageHome) {
            return 30;
        }
        return 36;
    }
    get isNomalState() {
        if (!this.item) return true;
        return this.item.status == 1;
    }
    goGamePlay() {
        const gameProxy: GameProxy = this.getProxy(GameProxy);
        gameProxy.api_vendor_var_ori_product_show_var(this.item);
    }

    @Watch("item")
    filterChange(val: boolean) {}

    onClickItem() {
        console.log("---dasd --");
    }
    get isNeetPlayBtn() {
        return SkinVariable.gameIconType == 1;
    }
}
