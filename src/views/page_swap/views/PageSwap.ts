import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageSwapMediator from "../mediator/PageSwapMediator";
import PageSwapProxy from "../proxy/PageSwapProxy";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import FagProxy from "@/proxy/FagProxy";
import dialog_swap_record from "@/views/dialog_swap_record";

@Component
export default class PageSwap extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageSwapProxy = this.getProxy(PageSwapProxy);
    pageData = this.myProxy.pageData;
    fagProxy: FagProxy = this.getProxy(FagProxy);
    trail = this.myProxy.pageData.trial;
    GamePlatConfig = GamePlatConfig;

    constructor() {
        super(PageSwapMediator);
    }

    get questionData() {
        return this.fagProxy.qData.type3;
    }

    get tolerance() {
        return this.myProxy.pageData.swap_setting_info.tolerance_params;
    }

    mouseover() {
        this.pageData.icon = "mdi-swap-vertical";
    }

    mouseleave() {
        this.pageData.icon = "mdi-arrow-down";
    }

    /**交易对调 */
    private tradeSwap() {
        this.myProxy.tradeReverse();
    }

    /**交易对调 */
    private chartSwap() {
        this.myProxy.chartReverse();
    }

    handlerRecord() {
        dialog_swap_record.show();
    }

    handlerRefresh() {
        this.myProxy.api_plat_var_swap_setting_info();
        this.myProxy.api_user_var_swap_trial();
        this.myProxy.api_plat_var_swap_k();
    }
}
