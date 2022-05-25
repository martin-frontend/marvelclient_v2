import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageMineMediator from "../mediator/PageMineMediator";
import PageMineProxy from "../proxy/PageMineProxy";
import dialog_record_mine from "@/views/dialog_record_mine";
import dialog_bet_record from "@/views/dialog_bet_record";
import SelfProxy from "@/proxy/SelfProxy";

@Component
export default class PageMine extends AbstractView {
    myProxy: PageMineProxy = this.getProxy(PageMineProxy);
    pageData = this.myProxy.pageData;

    private selfProxy: SelfProxy = this.getProxy(SelfProxy);

    constructor() {
        super(PageMineMediator);
    }

    mounted() {
        // this.selfProxy.api_user_show_var([3, 4, 5, 6]);
    }

    /**奖励记录 */
    handlerMineRecord() {
        dialog_record_mine.show();
    }
    /**投注记录 */
    handlerBetRecord() {
        dialog_bet_record.show();
    }
    /**领取奖励 */
    handlerAward() {
        this.myProxy.api_user_var_backwater_trial_receive();
    }

    jumpTo(target: string) {
        window.scrollTo({
            //@ts-ignore
            top: document.querySelector(target).offsetTop,
            behavior: "smooth",
        });
    }
}
