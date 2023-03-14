import AbstractView from "@/core/abstract/AbstractView";
import { number } from "echarts/core";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomSelect extends AbstractView {
    @Prop() options!: any;
    @Prop() icons!: any;
    @Prop({ default: "100%" }) width!: string;
    @Prop({ default: "41" }) height!: string;
    @Prop({ default: false }) isPill!: boolean;
    @Prop({ default: 14 }) fontSize!: number;
    @Prop({ default: 30 }) iconSize!: number;
    @Prop({ default: "rgba(255,255,255,0.05)" }) background!: string;

    private selectValue = this.getValue;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.selectValue = this.value;
    }

    get getValue() {
        return this.value != undefined ? this.value : "";
    }

    private onChange(value: number | any) {
        this.selectValue = value;
        this.$emit("input", value);
        this.$emit("change", value);
    }
}
