import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class CoinTip extends AbstractView {
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;
    pcWidth = 160;
    mobileWidth = 120;

    get coinTipData() {
        return this.selfProxy.coinTipData;
    }

    @Prop({ default: true }) isLeft!: boolean;

    get tipsClass(): string {
        let _class = "";
        if (this.$mobile) {
            _class = _class + " tip_color_mob";
        } else {
            _class = _class + " tip_color_pc";
        }

        // if (this.isLeft) {
        //     if (this.$mobile) {
        //         _class = _class + " tip_left_mob";
        //     } else {
        //         _class = _class + " tip_left";
        //     }
        // } else
        {
            //_class = _class + " tip_right";

            if (this.$mobile) {
                _class = _class + " tip_right";
            } else {
                _class = _class + " tip_left";
            }
        }

        return _class;
    }

    get styleObj() {
        if (this.$mobile) {
            return {
                top: this.coinTipData.top + "px",
                left: this.coinTipData.left + this.coinTipData.width + 15 + "px",
            };
        }

        return {
            top: this.coinTipData.top + "px",
            left: this.coinTipData.left - this.pcWidth - 15 + "px",
        };
    }
}
