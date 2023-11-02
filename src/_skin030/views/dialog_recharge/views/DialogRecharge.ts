import SelfProxy from "@/proxy/SelfProxy";
import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";

import { Component, Watch } from "vue-property-decorator";
import DialogRechargeMediator from "../mediator/DialogRechargeMediator";
import DialogRechargeProxy from "../proxy/DialogRechargeProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class DialogRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    selfProxy = PanelUtil.getProxy_selfproxy;
    pageData = this.myProxy.pageData;
    GlobalVar = GlobalVar;
    core = core;
    constructor() {
        super(DialogRechargeMediator);
    }

    typechange = 0;

    openGoldWater() {
        PanelUtil.openpanel_gold_waterl();
    }

    @Watch("myProxy.pageData.tabIndex")
    onTabChange() {
        console.warn("tab切换 -----" ,  this.pageData.tabIndex);
        window.scrollTo(0, 0);
        this.myProxy.rechargeProxy.pageData.form.amount = "";
        this.myProxy.exchangeProxy.pageData.form.amount = "";
    }

    onClose() {
        this.myProxy.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    goRecord() {
        if (this.pageData.tabIndex == "0") {
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
