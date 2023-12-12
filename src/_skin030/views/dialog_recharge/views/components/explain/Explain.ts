import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Explain extends AbstractView {
    LangUtil = LangUtil;
    myProxy = PanelUtil.getProxy_recharge;
    pageData = this.myProxy.rechargeProxy.pageData;
    form = this.pageData.form;

    plat_coins = GamePlatConfig.config.plat_coins;

    @Prop({ default: [""] }) explain!: string[]; // deposit instructions
    @Prop({ default: "" }) cls!: string; // css class
    @Prop({ default: "" }) width!: string;
}
