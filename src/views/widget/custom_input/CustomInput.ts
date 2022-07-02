import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomInput extends AbstractView {
    @Prop() icon!: string;
    @Prop() placeholder!: string;
    @Prop({ default: "text" }) type!: string;
    @Prop({ default: 100 }) maxlength!: number;

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
<<<<<<< HEAD
=======

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
>>>>>>> 75903d1d1dbfe4e171898c62da1e60e085c27487
}
