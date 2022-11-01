import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import MarketUtils from "@/_skin001/views/page_home/utils/MarketUtils";
import { MarketVO, SelectionVO } from "@/_skin001/vo/CompetitionVO";
import Vue from "vue";

@Component
export default class BtnFixedBet extends AbstractView {
    LangUtil = LangUtil;
    MarketUtils = MarketUtils;

    @Prop() market!: MarketVO;
    @Prop() selection!: SelectionVO;

    oldData!: any; //保存数据'
    iconOdds = require("@/_skin001/assets/icon/icon_odds_up.png");
    cleartimer = 0;

    mounted() {
        this.watchSelection();
        this.clearOddsStatus();
    }

    //添加 涨迭样式
    @Watch("selection")
    watchSelection() {
        const divPrice: HTMLElement = <any>this.$refs.divPrice;
        const imgOdds: HTMLElement = <any>this.$refs.imgOdds;

        if (this.oldData) {
            //@ts-ignore
            const cha = this.selection.price.back - this.oldData.price.back;
            if (cha > 0) {
                this.clearOddsStatus();
                this.iconOdds = require("@/_skin001/assets/icon/icon_odds_up.png");
                if (divPrice) divPrice.style.color = "#E7314B";
                if (imgOdds) imgOdds.style.opacity = "1";
                imgOdds?.classList.add("animation-translate");
            } else if (cha < 0) {
                this.clearOddsStatus();
                this.iconOdds = require("@/_skin001/assets/icon/icon_odds_down.png");
                if (divPrice) divPrice.style.color = "#2B9400";
                if (imgOdds) imgOdds.style.opacity = "1";
                imgOdds?.classList.add("animation-translate");
            }
            this.oldData = JSON.parse(JSON.stringify(this.selection));
        } else {
            this.oldData = JSON.parse(JSON.stringify(this.selection));
        }
    }

    clearOddsStatus() {
        clearTimeout(this.cleartimer);
        const imgOdds: HTMLElement = <any>this.$refs.imgOdds;
        const divPrice: HTMLElement = <any>this.$refs.divPrice;
        const vuetify = Vue.vuetify;
        if (imgOdds && divPrice) {
            this.cleartimer = setTimeout(() => {
                imgOdds.style.opacity = "0";
                imgOdds.classList.remove("animation-translate");
                divPrice.style.color = vuetify.framework.breakpoint.mobile?"#3b3b3b":"#fffff";
            }, 5000);
        }
    }

    getPrice() {
        if (this.selection && this.selection.price && this.selection.price.back) {
            return this.selection.price.back;
        }
        return "--";
    }
}
