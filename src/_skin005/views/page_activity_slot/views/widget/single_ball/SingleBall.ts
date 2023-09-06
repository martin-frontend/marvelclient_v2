import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class SingleBall extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: 0 }) data!: any;
    @Prop({ default: 0 }) img_index!: any;
    @Prop({ default: 25 }) item_width!: number;
    @Prop({ default: 25 }) item_height!: number;
    @Prop({ default: 16 }) text_font!: number;
    get ballImg() {
        return require(`@/_skin005/assets/ballaward/ball_img_${this.img_index}.png`);
    }
    get text_font_size() {
        return "text-" + this.text_font;
    }
}
