import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomSelect extends AbstractView {
    @Prop() options!: any;
    @Prop() icons!: any;

    private selectValue = this.getValue;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.selectValue = this.value;
    }

    get getValue() {
        return this.value != undefined ? this.value : "";
    }

    private onChange(value: any) {
        this.selectValue = value;
        this.$emit("input", value);
        this.$emit("change", value);
    }
}
