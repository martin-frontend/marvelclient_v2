import AbstractView from "@/core/abstract/AbstractView";
import LoginEnter from "@/core/global/LoginEnter";
import GameProxy from "@/proxy/GameProxy";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class GameItem extends AbstractView {
    LangUtil = LangUtil;

    @Prop() item!: any;
    ww = 224;
    hh = 280;

    get getTag() {
        if (this.item.tags.length == 0) return "";
        // 1-新 2-火热
        return this.item.tags[0] == 1 ? require("@/assets/tag/new.png") : require("@/assets/tag/hot.png");
    }

    @Watch("$vuetify.breakpoint.mobile")
    onWatchWidth() {
        if (this.$vuetify.breakpoint.mobile) {
            (this.ww = 124), (this.hh = 154);
        } else {
            (this.ww = 224), (this.hh = 280);
        }
    }

    getBoxClass() {
        let classStr = "box";
        if (this.item) {
            classStr += " box-height";
            if (this.item.status != 1) {
                classStr += " filter-gray";
            }
        }
        return classStr;
    }

    goGamePlay() {
        if (this.item) {
            LoginEnter(() => {
                const gameProxy: GameProxy = this.getProxy(GameProxy);
                gameProxy.api_vendor_var_ori_product_show_var(this.item);
            });
        }
    }
}
