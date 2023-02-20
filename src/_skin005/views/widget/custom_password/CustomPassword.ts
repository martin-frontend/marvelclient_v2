import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomPassword extends AbstractView {
    @Prop() icon!: string;
    @Prop() placeholder!: string;
    @Prop({ default: 20 }) maxlength!: number;
    @Prop({ default: true }) isBottomLine!: boolean;
    inputValue = this.getValue;
    bShowPassword = true;


    isFocus = false;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.inputValue = this.value;
    }
    public get inputClass(): string {
        let str = "";
        if (this.isBottomLine) {
            str = "input-text-border-bottom";
        }
        else {
            str = "input-text";
        }

        if (this.isFocus) {
            str = str + "_focus";
        }
        return str;
    }


    onInput(value: any) {
        this.inputValue = this.inputValue.replace(/[\u4e00-\u9fa5]/g, "");
        this.inputValue = this.inputValue.replace(/\s*/g, "");
        this.$emit("input", this.inputValue);
    }

    onBlur() {
        this.isFocus = false;
        this.$emit("blur");
    }
    onFocus() {
        this.isFocus = true;
        this.$emit("focus");
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
