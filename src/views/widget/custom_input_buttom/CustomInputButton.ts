import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomInputButton extends AbstractView {
    @Prop() placeholder!: string;
    @Prop({ default: "text" }) type!: string;
    @Prop({ default: 100 }) maxlength!: number;
    @Prop() height!: string;
    @Prop() buttonName!: string;

    inputValue = this.getValue;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.inputValue = this.value;
    }

    onInput(value: any) {
        this.$emit("input", this.inputValue);
    }

    get getButtonName() {
        return this.buttonName ? this.buttonName : "";
    }

    get getValue() {
        return this.value ? this.value : "";
    }

    get getHeight() {
        return this.height ? this.height : "50";
    }

    onClick() {
        this.$emit("click");
    }
}
