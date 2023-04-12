import SelfProxy from "@/proxy/SelfProxy";
import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";

import { Component, Watch } from "vue-property-decorator";
import DialogRechargeMediator from "../mediator/DialogRechargeMediator";
import DialogRechargeProxy from "../proxy/DialogRechargeProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class DialogRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    selfProxy = PanelUtil.getProxy_selfproxy;
    pageData = this.myProxy.pageData;
    GlobalVar = GlobalVar;
    core=core;
    constructor() {
        super(DialogRechargeMediator);
    }

    typechange = 0;

    /**图标时间选择 */
    onTimeChange(val: any) {
        this.pageData.tabIndex = parseInt(val);
        this.onTabClick(this.pageData.tabIndex);
    }

    onTabClick(idx: number) {
        this.myProxy.exchangeProxy.resetform();
        this.myProxy.transferProxy.resetform();
        this.pageData.tabIndex = idx;
    }

    onClose() {
        this.myProxy.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    goRecord() {
        if (this.pageData.tabIndex == 0) {
            PanelUtil.openpanel_record_recharge();
        } else {
            PanelUtil.openpanel_record_exchange();
        }
        //this.pageData.bShow = false;
    }

    viewDetail() {
        PanelUtil.openpanel_wallet(2, 0);
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        this.typechange = 0;
    }
}
