import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { number } from "echarts/core";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomSelect extends AbstractView {
    @Prop() options!: any;
    @Prop() icons!: any;
    @Prop({ default: "100%" }) width!: string;
    @Prop({ default: "41" }) height!: string;
    @Prop({ default: false }) isPill!: boolean;
    @Prop({ default: 16 }) fontSize!: number;
    @Prop({ default: 30 }) iconSize!: number;

    private selectValue = this.getValue;
    LangUtil = LangUtil;
    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.selectValue = this.value;
    }

    get getValue() {
        return this.value != undefined ? this.value : "";
    }

    private onChange(value: number | any, optionValue: number) {
        this.selectValue = value;
        this.$emit("input", optionValue);
        this.$emit("change", optionValue);
    }
}
