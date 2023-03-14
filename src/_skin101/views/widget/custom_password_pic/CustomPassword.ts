import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomPassword extends AbstractView {
    @Prop() icon!: string;
    @Prop() placeholder!: string;
    @Prop({ default: 20 }) maxlength!: number;

    inputValue = this.getValue;
    bShowPassword = true;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.inputValue = this.value;
    }
    onInput(value: any) {
        this.inputValue = this.inputValue.replace(/[\u4e00-\u9fa5]/g, "");
        this.inputValue = this.inputValue.replace(/\s*/g, "");
        this.$emit("input", this.inputValue);
    }

    get getValue() {
        return this.value ? this.value : "";
    }

    getType(): string {
        return this.bShowPassword ? "password" : "text";
    }

    onClear() {
        this.inputValue = "";
        this.$emit("input", this.inputValue);
    }

    onToggle() {
        this.bShowPassword = !this.bShowPassword;
    }
}
