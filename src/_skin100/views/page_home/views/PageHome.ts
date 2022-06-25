import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageHomeMediator from "../mediator/PageHomeMediator";
import PageHomeProxy from "../proxy/PageHomeProxy";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import PageIntroduceProxy from "@/_skin100/views/page_home/widget/page_introduce/proxy/PageIntroduceProxy.ts";
@Component
export default class PageHome extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageHomeProxy = this.getProxy(PageHomeProxy);
    myProxyV2: PageIntroduceProxy = this.getProxy(PageIntroduceProxy);
    pageData = this.myProxyV2.pageData;
    reward_coin_info = this.pageData.reward_coin_info;

    constructor() {
        super(PageHomeMediator);
    }
    goContractInfo() {
        OpenLink(this.reward_coin_info.contract_address);
    }
}
