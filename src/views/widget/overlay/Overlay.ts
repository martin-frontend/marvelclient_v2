import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Prop, Watch } from "vue-property-decorator";
import OverlayMediator from "./OverlayMediator";

@Component
export default class Overlay extends AbstractView {
    commonIcon = Assets.commonIcon;
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
