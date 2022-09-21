import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomInput extends AbstractView {
    @Prop() icon!: string;
    @Prop() placeholder!: string;
    @Prop({ default: "text" }) type!: string;
    @Prop({ default: 100 }) maxlength!: number;
    @Prop({ default: 100 }) diglength!: number; //小数位
    @Prop({ default: 100 }) intlength!: number; //小数位
    @Prop({ default: false }) isNum!: boolean; //小数位

    inputValue = this.getValue;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.inputValue = this.value;
    }

    onInput(value: any) {
        if (this.isNum) {
            // const RegStr = `^[\\+\\-]?\\d+\\.?\\d{0,${this.diglength}}`;
            const RegStr = `^[\\+\\-]?\\d{1,${this.intlength}}(\\.\\d{0,${this.diglength}})?`;
            this.inputValue = this.inputValue.match(new RegExp(RegStr, "g")) || null;
        }
        this.$emit("input", this.inputValue);
    }

    get getValue() {
        return this.value ? this.value : "";
    }

    onClear() {
        this.inputValue = "";
        this.$emit("input", this.inputValue);
    }
}
