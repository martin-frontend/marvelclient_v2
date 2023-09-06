import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class ArtNumber extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: 0 }) data!: any;
    @Prop({ default: 50 }) item_width!: number;
    @Prop({ default: 60 }) item_height!: number;
    /**计算数字的类 */
    getNubClass(item: any) {
        let str = item;
        switch (item) {
            case "%":
                str = "P";
                break;
            case "n":
                str = "N";
                break;
            case "o":
                str = "O";
                break;
            case "r":
                str = "R";
                break;
            case ".":
                str = "D";
                break;
            case "$":
                str = "F";
                break;
        }
        return "number_" + str;
    }
}
