import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomDatePick extends AbstractView {
    @Prop() icon!: string;
    @Prop() placeholder!: string;
    @Prop({ default: "text" }) type!: string;
    @Prop({ default: 100 }) maxlength!: number;
    @Prop()disabled!:number;
    @Prop()readonly!:number;
    @Prop() height!: string;
    
    inputValue = this.getValue;
    LangUtil = LangUtil;

    @Prop() value!: any;
    @Watch("value", { immediate:true })
    onValueChange(val: any) {
        this.inputValue = val;
    }

    onInput(value: any) {
        this.$emit("input", this.inputValue);
    }

    get getValue() {
        return this.value ? this.value : '';
    }

    onClear() {
        this.inputValue = '';
        this.$emit("input", []);
    }
}
