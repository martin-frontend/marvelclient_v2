import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import { amountFormat } from "@/core/global/Functions";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";

@Component
export default class MoneyWinLost extends AbstractView {
    @Prop() value: any;
    LangUtil = LangUtil;
    amountFormat = amountFormat;
    CoinTransformHelper = CoinTransformHelper;

    num = 0;

    mounted() {
        this.num = typeof this.value == "string" ? parseFloat(this.value) : this.value;
    }

    @Watch("value")
    onWatchValue() {
        this.num = typeof this.value == "string" ? parseFloat(this.value) : this.value;
    }

    get numSymbos() {
        if (this.num > 0) return "+";
        if (this.num < 0) return "-";
        return "";
    }

    get coinSymbol() {
        return GamePlatConfig.getcoin_symbol(GamePlatConfig.getMainCoin());
    }

    get colorClass() {
        if (this.num == 0) return "nomal_text--text";
        else if (this.num > 0) return "red--text";
        else return "textGreen--text";
    }
}
