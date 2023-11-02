import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageRulesHiddenMediator from "../mediator/PageRulesHiddenMediator";
import PageRulesHiddenProxy from "../proxy/PageRulesHiddenProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class PageRulesHidden extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageRulesHiddenProxy = this.getProxy(PageRulesHiddenProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(PageRulesHiddenMediator);
    }
    destroyed() {
        super.destroyed();
    }
}
