import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomInput extends AbstractView {
    @Prop() icon!: string;
    @Prop() placeholder!: string;
    @Prop({ default: "text" }) type!: string;
    @Prop({ default: 100 }) maxlength!: number;

    inputValue = this.getValue;
    bShowPassword = true;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.inputValue = this.value;
    }

    onInput(value: any) {
        if (this.type == "password") {
            this.inputValue = this.inputValue.replace(/[\u4e00-\u9fa5]/g, "");
            this.inputValue = this.inputValue.replace(/\s*/g, "");
        }
        this.$emit("input", this.inputValue);
    }

    get getValue() {
        return this.value ? this.value : "";
    }

    getType(): string {
        if (this.type == "password") {
            return this.bShowPassword ? this.type : "text";
        }
        return this.type;
    }

    onClear() {
        this.inputValue = "";
        this.$emit("input", this.inputValue);
    }

    onToggle() {
        this.bShowPassword = !this.bShowPassword;
    }

    onClick() {
        this.$emit("click");
    }
}
