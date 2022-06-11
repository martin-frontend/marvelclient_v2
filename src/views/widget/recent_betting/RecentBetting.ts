import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";
import RecentBettingMediator from "./RecentBettingMediator";
import RecentBettingProxy from "./RecentBettingProxy";
import gsap, { Linear, Elastic } from "gsap";

@Component
export default class RecentBetting extends AbstractView {
    LangUtil = LangUtil;
    myProxy: RecentBettingProxy = getProxy(RecentBettingProxy);
    pageData = this.myProxy.pageData;
    titles = [LangUtil("游戏名称"), LangUtil("玩家"), LangUtil("时间"), LangUtil("投注金额(USD)"), LangUtil("盈利(USD)")];

    constructor() {
        super(RecentBettingMediator);
    }

    timer = 0;

    mounted() {
        this.timer = setInterval(() => {
            if (this.pageData.catchList.length > 0) {
                this.pageData.list.unshift(this.pageData.catchList.pop());
                if (this.pageData.list.length > 11) {
                    this.pageData.list.pop();
                }
                const listbox: HTMLElement = <any>this.$refs.listbox;
                gsap.fromTo(listbox, { y: -(this.$vuetify.breakpoint.xsOnly ? 30 : 60) }, { y: 0, duration: 1 });
            }
        }, 5000);
    }

    destroyed() {
        clearInterval(this.timer);
        super.destroyed();
    }
}
