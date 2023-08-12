import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomSelect extends AbstractView {
    LangUtil = LangUtil;
    @Prop() options!: any;
    @Prop() icons!: any;
    @Prop({ default: "100%" }) width!: string;
    @Prop({ default: "41" }) height!: string;
    @Prop({ default: false }) isPill!: boolean;
    @Prop({ default: 16 }) fontSize!: number;
    @Prop({ default: 30 }) iconSize!: number;
    @Prop({ default: null }) isSetChange!: boolean | undefined;
    @Prop({ default: "" }) placeholder!: string;
    @Prop({ default: false }) isForeSelect!: boolean;
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

    public get inputClass(): string {
        // let str = "";
        // str = "select-text";
        if (this.isSetChange == null) {
            if (this.$mobile) {
                return "select-text";
            }
            return "select-text select_bg-text";
        } else {
            if (this.isSetChange) {
                return "select-text";
            }
            return "select-text select_bg-text";
        }
    }

    public item_class(key: any): string {
        const text_font = "text-" + this.fontSize;
        if (key == this.selectValue) {
            return "primary--text " + text_font;
        }
        return text_font;
    }
    get isDisabled() {
        if (this.isForeSelect) return false;
        if (this.options && Object.keys(this.options).length > 1) {
            return false;
        }
        return true;
    }
}
