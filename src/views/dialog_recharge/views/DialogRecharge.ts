import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import getProxy from "@/core/global/getProxy";
import dialog_record_exchange from "@/views/dialog_record_exchange";
import dialog_record_recharge from "@/views/dialog_record_recharge";
import { Component, Watch } from "vue-property-decorator";
import DialogRechargeMediator from "../mediator/DialogRechargeMediator";
import DialogRechargeProxy from "../proxy/DialogRechargeProxy";

@Component
export default class DialogRecharge extends AbstractView {
    myProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogRechargeMediator);
    }

    onTabClick(idx: number) {
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

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}

