import AbstractView from "@/core/abstract/AbstractView";
import Assets from "@/_skin005/assets/Assets";
import PageBlur from "@/_skin005/core/PageBlur";
import { Prop, Watch, Component } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class LangSelect extends AbstractView {
    commonIcon = Assets.commonIcon;
    @Prop() options!: any;
    @Prop() icons!: any;
    @Prop({ default: "100%" }) width!: string;
    @Prop({ default: "40" }) height!: string;
    @Prop({ default: 16 }) fontSize!: number;
    @Prop({ default: 22 }) iconSize!: number;
    @Prop({ default: true }) mini!: boolean;

    private selectValue = this.getValue;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.selectValue = this.value;
    }

    get getValue() {
        return this.value != undefined ? this.value : "";
    }

    get extraClass() {
        return GlobalVar.skin == "skin006_1" ? "lighter" : "";
    }

    private onChange(value: any) {
        this.selectValue = value;
        this.$emit("input", value);
        this.$emit("change", value);
    }

    isFilterChange = false;
    @Watch("isFilterChange")
    filterChange(val: boolean) {
        if (this.$mobile) {
            PageBlur.blur_page(this.isFilterChange);
        } else PageBlur.blur_mainpage(this.isFilterChange);
    }
    setIsFilter(val: boolean) {
        this.isFilterChange = val;
    }

    isCurItem(item: any) {}
}
