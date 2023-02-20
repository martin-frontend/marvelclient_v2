import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CoinTip extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: true }) isLeft!: boolean;
}
