import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageBonusMediator from "../mediator/PageBonusMediator";
import PageBonusProxy from "../proxy/PageBonusProxy";

@Component
export default class PageBonus extends AbstractView {
    myProxy: PageBonusProxy = this.getProxy(PageBonusProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(PageBonusMediator);
    }
}
