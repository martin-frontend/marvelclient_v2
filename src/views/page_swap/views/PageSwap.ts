import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageSwapMediator from "../mediator/PageSwapMediator";
import PageSwapProxy from "../proxy/PageSwapProxy";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import FagProxy from "@/proxy/FagProxy";

@Component
export default class PageSwap extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageSwapProxy = this.getProxy(PageSwapProxy);
    pageData = this.myProxy.pageData;
    fagProxy: FagProxy = this.getProxy(FagProxy);
    GamePlatConfig = GamePlatConfig;

    constructor() {
        super(PageSwapMediator);
    }

    get questionData() {
        return this.fagProxy.qData.type3;
    }
}
