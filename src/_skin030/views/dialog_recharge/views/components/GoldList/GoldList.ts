import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import { Component, Prop } from "vue-property-decorator";
import { chunk } from "@/core/global/Functions";

@Component
export default class GoldList extends AbstractView {
    LangUtil = LangUtil;
    myProxy = PanelUtil.getProxy_recharge;
    pageData = this.myProxy.rechargeProxy.pageData;
    form = this.pageData.form;

    chunk = chunk;

    @Prop({ default: [] }) goldList!: number[];
    @Prop({ default: "" }) cls!: string; // css class

    get chunks() {
        return chunk(
            this.goldList.filter((i) => Boolean(i)),
            4
        );
    }
}
