import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/_skin030/assets/Assets";

@Component
export default class DailyItem extends AbstractView {
    LangUtil = LangUtil;
    @Prop() item!: any;
    @Prop() width!: number;
    @Prop() height!: number;
    @Prop({ default: false }) isToday!: boolean; //是否为今天

    get item_icon_path() {
        if (this.item.rule_num == 7) {
            return Assets.commonIcon.seventh_day_img;
        }
        return require(`@/_skin030/assets/daily_sign/gold_${this.item.rule_num}.png`);
    }
    get item_icon_got_path() {
        return require(`@/_skin030/assets/daily_sign/got.png`);
    }
    get isLastItem() {
        return this.item.rule_num == 7;
    }
    /**是否已经领取 */
    get isGot(): boolean {
        //return true;
        // 任务进度:1-待完成|2-待分享|3-待签到|81-待领取|91-已完成
        if (this.item.process == 91 || this.item.process == "91") {
            return true;
        }
        return false;
    }

    get award_text(): string {
        if (!this.item) return "";

        let str = "";
        const params = this.item.award.params;
        // const params = <any>{
        //     BRL:"24",
        //     USDT:"2"
        // }
        const keys = Object.keys(params);

        for (let index = 0; index < keys.length; index++) {
            str = str + keys[index] + "<span class='font-weight-bold'>" + LangUtil("X") + params[keys[index]] + "</span>";
            if (index < keys.length - 1) {
                str = str + "<br>";
            }
        }
        return str;
    }
    onItemClick() {
        if (this.isGot) {
            return;
        }
        //console.log("收到按钮点击",this.item);
        this.$emit("onItemClick", this.item);
    }
}
