import SelfProxy from "@/proxy/SelfProxy";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_record_exchange from "@/_skin100/views/dialog_record_exchange";
import dialog_record_recharge from "@/_skin100/views/dialog_record_recharge";
import dialog_wallet from "@/_skin100/views/dialog_wallet";
import { Component, Watch } from "vue-property-decorator";
import DialogRechargeMediator from "../mediator/DialogRechargeMediator";
import DialogRechargeProxy from "../proxy/DialogRechargeProxy";

@Component
export default class DialogRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    selfProxy: SelfProxy = getProxy(SelfProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogRechargeMediator);
    }

    onTabClick(idx: number) {
        this.myProxy.exchangeProxy.resetform();
        this.myProxy.transferProxy.resetform();
        this.pageData.tabIndex = idx;
    }

    onClose() {
        this.myProxy.pageData.bShow = false;
    }

    goRecord() {
        if (this.pageData.tabIndex == 0) {
            dialog_record_recharge.show();
        } else {
            dialog_record_exchange.show();
        }
        this.pageData.bShow = false;
    }

    viewDetail() {
        dialog_wallet.show(2, 0);
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}
