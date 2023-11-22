import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogSpinLotteryProxy from "../../proxy/DialogSpinLotteryProxy";

@Component
export default class PointedSector extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogSpinLotteryProxy = this.getProxy(DialogSpinLotteryProxy);
    pageData = this.myProxy.pageData;

    @Prop({ default: null }) data!: any;
    /**状态  0 正常 1活动 2获得*/
    item_state = 0;
    /**设置为活动状态 */
    setActive() {
        this.item_state = 1;
    }
    setNomal() {
        this.item_state = 0;
    }
    setGet() {
        this.item_state = 2;
    }

    setItemData(data: any) {
        this.data = data;
    }
    get itemClass() {
        switch (this.item_state) {
            case 0:
                return "turn_item";
            case 1:
                return "turn_item_active";
            case 2:
                return "turn_item_active item_get";
            // return "turn_item_active";
        }
        return "";
    }
    get sectorImg() {
        return require("@/_skin005/assets/activity_spin/sector/pointedSector.png");
    }
    get coinName() {
        if (!this.data) return "";
        if (this.data.type == 3) {
            return this.data.params.key;
        } else if (this.data.type == 4) {
            return LangUtil("奖池");
        }
        return this.data.type;
    }
}
