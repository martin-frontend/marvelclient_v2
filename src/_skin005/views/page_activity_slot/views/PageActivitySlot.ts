import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageActivitySlotMediator from "../mediator/PageActivitySlotMediator";
import PageActivitySlotProxy from "../proxy/PageActivitySlotProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class PageActivitySlot extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageActivitySlotProxy = this.getProxy(PageActivitySlotProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(PageActivitySlotMediator);
    }
    destroyed() {
        super.destroyed();
    }

    onClickRuleBtn() {
        const obj = JSON.parse(JSON.stringify(this.pageData.dataSource));
        obj.award_type = 0;
        if (!obj.link_url) {
            obj.link_url = obj.rule_desc;
        }
        PanelUtil.openpanel_activity_detail(obj);
    }
}
