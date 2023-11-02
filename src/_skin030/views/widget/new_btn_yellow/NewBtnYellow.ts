import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class NewBtnYellow extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: true }) showMoneyIcon!: boolean;
    @Prop({ default: "" }) money!: any;
    @Prop({ default: false }) isActive!: any;
}
