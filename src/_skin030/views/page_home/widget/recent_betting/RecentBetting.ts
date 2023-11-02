import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";
import RecentBettingMediator from "./RecentBettingMediator";
import RecentBettingProxy from "./RecentBettingProxy";
import gsap, { Linear, Elastic } from "gsap";
import { changeDateShow } from "@/core/global/Functions";
import CoinTransformHelper from "@/_skin030/core/CoinTransformHelper";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class RecentBetting extends AbstractView {
    LangUtil = LangUtil;
    myProxy: RecentBettingProxy = getProxy(RecentBettingProxy);
    pageData = this.myProxy.pageData;
    titles = [LangUtil("游戏名称"), LangUtil("玩家"), LangUtil("时间"), LangUtil("投注金额(USD)"), LangUtil("盈利(USD)")];
    core = core;
    constructor() {
        super(RecentBettingMediator);
    }

    timer = 0;

    get itemHeight() {
        return this.$xsOnly ? 45 : 53;
    }
    mounted() {
        this.timer = setInterval(() => {
            if (this.pageData.catchList.length > 0) {
                this.pageData.list.unshift(this.pageData.catchList.pop());
                if (this.pageData.list.length > 11) {
                    this.pageData.list.pop();
                }
                const listbox: HTMLElement = <any>this.$refs.listbox;
                gsap.fromTo(listbox, { y: -this.itemHeight }, { y: 0, duration: 0.5 });
            }
        }, 2000);
    }

    destroyed() {
        clearInterval(this.timer);
        super.destroyed();
    }
    getDate(str: string, isChange: boolean = true) {
        return changeDateShow(str, isChange);
    }
    transformMoney(val: string) {
        return CoinTransformHelper.TransformMoney(val, 2, GameConfig.config.SettlementCurrency, "USDT");
    }
    tabOptions = () => {
        const obj = <any>{};

        obj[0] = LangUtil("近期投注");

        // obj[1] = LangUtil("电子投注");

        // obj[2] = LangUtil("体育投注");

        return obj;
    };
    typechange = 0;
    /**图标时间选择 */
    onTimeChange(val: any) {
        console.log("点击的值 为", val);
        // this.pageData.tabIndex = parseInt(val);
        // this.onTabClick(this.pageData.tabIndex);
    }
}
