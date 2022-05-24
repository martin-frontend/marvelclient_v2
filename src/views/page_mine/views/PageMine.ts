import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageMineMediator from "../mediator/PageMineMediator";
import PageMineProxy from "../proxy/PageMineProxy";
import dialog_record_mine from "@/views/dialog_record_mine";
import dialog_bet_record from "@/views/dialog_bet_record";

@Component
export default class PageMine extends AbstractView {
    myProxy: PageMineProxy = this.getProxy(PageMineProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(PageMineMediator);
    }
    /**奖励记录 */
    handlerMineRecord() {
        dialog_record_mine.show();
    }
    /**投注记录 */
    handlerBetRecord() {
        dialog_bet_record.show();
    }
}
