import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomInput extends AbstractView {
    @Prop() icon!: string;
    @Prop() placeholder!: string;
    @Prop({ default: "text" }) type!: string;
    @Prop({ default: 100 }) maxlength!: number;
    @Prop({ default: 22 }) iconSize!: number;
    @Prop() disabled!: number;

    inputValue = this.getValue;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.inputValue = this.value;
    }

    onInput(value: any) {
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
