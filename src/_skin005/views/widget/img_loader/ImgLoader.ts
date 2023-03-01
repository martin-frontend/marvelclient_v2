import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class ImgLoader extends AbstractView {
    LangUtil = LangUtil;
    @Prop() src!: any;
    @Prop() height!: number | string;
    @Prop() width!: number | string;


    img_isload = false;
    onClick() {
        this.$emit("onClick");
    }

    load() {
        this.img_isload = false;
    }
    loadstart() {
        this.img_isload = true;
    }

}



