import Assets from "@/_skin030/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Prop, Watch } from "vue-property-decorator";
import OverlayMediator from "./OverlayMediator";
import SkinVariable from "@/_skin030/core/SkinVariable";

@Component
export default class Overlay extends AbstractView {
    commonIcon = Assets.commonIcon;
    SkinVariable = SkinVariable;
    constructor() {
        super(OverlayMediator);
    }

    inputValue = this.getValue;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.inputValue = this.value;
    }

    get getValue() {
        return this.value ? this.value : false;
    }

    hide() {
        this.inputValue = false;
        this.$emit("input", this.inputValue);
    }
}
