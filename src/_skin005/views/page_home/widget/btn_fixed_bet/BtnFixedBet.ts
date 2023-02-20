import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

import { MarketVO, SelectionVO } from "@/_skin001/vo/CompetitionVO";
import Vue from "vue";

@Component
export default class BtnFixedBet extends AbstractView {
    LangUtil = LangUtil;


    @Prop() market!: MarketVO;
    @Prop() selection!: SelectionVO;

    oldData!: any; //保存数据'
    iconOdds = require("@/_skin001/assets/icon/icon_odds_up.png");
    cleartimer = 0;

    mounted() {
        this.watchSelection();
        this.clearOddsStatus();
    }

    @Watch("$vuetify.theme.dark")
    onWatchCheme(){
        this.clearOddsStatus(0);
    }

    //添加 涨迭样式
    @Watch("selection")
    watchSelection() {
        const divbox: HTMLElement = <any>this.$refs.divbox;
        const divPrice: HTMLElement = <any>this.$refs.divPrice;
        const imgOdds: HTMLElement = <any>this.$refs.imgOdds;

        if (this.oldData) {
            //@ts-ignore
            const cha = this.selection.price.back - this.oldData.price.back;
            if (cha > 0) {
                this.clearOddsStatus();
                //this.iconOdds = require("@/_skin005/assets/icon/icon_odds_up.png");
                this.iconOdds = "arrow_up";
                if (divbox) divbox.style.borderColor = "#F64D55";
                if (divPrice) divPrice.style.color = "#F64D55";
                // if (imgOdds) imgOdds.style.opacity = "1";
                // if (imgOdds) imgOdds.style.color = "#F64D55";
                // imgOdds?.classList.add("animation-translate");

                if (imgOdds)
                {
                    imgOdds.style.opacity = "1";
                    imgOdds.style.color = "#F64D55";
                    imgOdds.classList.add("animation-translate");
                    imgOdds.style.display = "inherit";
                }

            } else if (cha < 0) {
                this.clearOddsStatus();
                //this.iconOdds = require("@/_skin005/assets/icon/icon_odds_down.png");
                this.iconOdds = "arrow_down";
                if (divbox) divbox.style.borderColor = "#41A81D";
                if (divPrice) divPrice.style.color = "#41A81D";
                // if (imgOdds) imgOdds.style.opacity = "1";
                // if (imgOdds) imgOdds.style.color = "#41A81D";
                if (imgOdds)
                {
                    imgOdds.style.opacity = "1";
                    imgOdds.style.color = "#41A81D";
                    imgOdds.classList.add("animation-translate");
                    imgOdds.style.display = "inherit";
                }
                
            }
            this.oldData = JSON.parse(JSON.stringify(this.selection));
        } else {
            this.oldData = JSON.parse(JSON.stringify(this.selection));
        }
    }

    clearOddsStatus(time = 5000) {
        clearTimeout(this.cleartimer);
        const divbox: HTMLElement = <any>this.$refs.divbox;
        const imgOdds: HTMLElement = <any>this.$refs.imgOdds;
        const divPrice: HTMLElement = <any>this.$refs.divPrice;
        if (imgOdds && divPrice) {
            this.cleartimer = setTimeout(() => {
                imgOdds.style.opacity = "0";
                imgOdds.classList.remove("animation-translate");
                imgOdds.style.display = 'none';
                divbox.style.borderColor = this.$vuetify.theme.dark ? "#333435" : "#F2F2F2";
                divPrice.style.color = this.$vuetify.theme.dark ? "#FFFFFF" : "#0F1213";
            }, time);
        }
    }

    getPrice() {
        if (this.selection && this.selection.price && this.selection.price.back) {
            return this.selection.price.back;
        }
        return "--";
    }
}
