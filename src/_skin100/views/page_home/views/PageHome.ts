import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageHomeMediator from "../mediator/PageHomeMediator";
import PageHomeProxy from "../proxy/PageHomeProxy";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import page_game_list from "@/_skin100/views/page_game_list";
import PageIntroduceProxy from "@/_skin100/views/page_home/widget/page_introduce/proxy/PageIntroduceProxy";
@Component
export default class PageHome extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageHomeProxy = this.getProxy(PageHomeProxy);
    myProxyV2: PageIntroduceProxy = this.getProxy(PageIntroduceProxy);
    pageData = this.myProxy.pageData;
    pageDataV2 = this.myProxyV2.pageData;
    reward_coin_info = this.pageDataV2.reward_coin_info;

    constructor() {
        super(PageHomeMediator);
    }
    goContractInfo() {
        OpenLink(this.reward_coin_info.contract_address);
    }
    onShowAll() {
        page_game_list.show();
    }
}
