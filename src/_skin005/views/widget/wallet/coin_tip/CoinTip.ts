import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CoinTip extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: true }) isLeft!: boolean;

    get tipsClass(): string {
        let _class = "";
        if (this.$vuetify.breakpoint.xsOnly) {
            _class = _class + " tip_color_mob";
        } else {
            _class = _class + " tip_color_pc";
        }

        // if (this.isLeft) {
        //     if (this.$vuetify.breakpoint.xsOnly) {
        //         _class = _class + " tip_left_mob";
        //     } else {
        //         _class = _class + " tip_left";
        //     }
        // } else 
        {
            _class = _class + " tip_right";
        }

        return _class;
    }
}
