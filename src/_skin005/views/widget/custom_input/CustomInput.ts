import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomInput extends AbstractView {
    @Prop() icon!: string;
    @Prop() placeholder!: string;
    @Prop({ default: "text" }) type!: string;
    @Prop({ default: "#ff0" }) iconcolor!: string;
    @Prop({ default: 100 }) maxlength!: number;
    @Prop() disabled!: number;
    @Prop() readonly!: number;
    @Prop() height!: string;
    @Prop() isOnlyNumber!: boolean;
    @Prop({ default: true }) isNeedCloseBtn!: boolean;
    @Prop() isOnlyInt!: boolean;
    @Prop() isOnlyFloat!: boolean;
    @Prop({ default: true }) isBottomLine!: boolean;

    inputValue = "";

    isFocus = false;

    @Prop() value!: any;
    @Watch("value", { immediate: true })
    onValueChange(val: string) {
        if (this.isOnlyNumber) {
            this.inputValue = val.replace(/[^\d.]/g, "");
            return;
        }
        this.inputValue = val;
    }

    onInput(event: any) {
        if (this.isOnlyNumber) {
            this.inputValue = event.target.value.replace(/[^\d.]/g, "");
            this.$emit("input", this.inputValue);
            return;
        }
        if (this.isOnlyInt) {
            this.inputValue = event.target.value.replace(/[^0-9]/g, "");
            this.$emit("input", this.inputValue);
            return;
        }
        if (this.isOnlyFloat) {
            this.inputValue = event.target.value.replace(/[^\d.]/g, "");
            this.inputValue = this.inputValue.replace("-", "");
            if (parseFloat(this.inputValue) < 0) {
                this.inputValue = "0";
            }
            this.$emit("input", this.inputValue);
            return;
        }

        this.$emit("input", this.inputValue);
    }

    onClear() {
        this.inputValue = "";
        this.$emit("input", this.inputValue);
    }

    public get inputClass(): string {
        let str = "";
        if (this.isBottomLine) {
            str = "input-text-border-bottom";
        } else {
            str = "input-text";
        }

        if (this.isFocus) {
            str = str + "_focus";
        }
        return str;
    }

    onBlur() {
        this.isFocus = false;
        this.$emit("blur");
    }
    onFocus() {
        this.isFocus = true;
        this.$emit("focus");
    }
}
