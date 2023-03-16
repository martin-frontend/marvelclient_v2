import SelfProxy from "@/proxy/SelfProxy";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_record_exchange from "@/_skin004/views/dialog_record_exchange";
import dialog_record_recharge from "@/_skin004/views/dialog_record_recharge";
import dialog_gold_water from "@/_skin004/views/dialog_gold_water";
import dialog_wallet from "@/views/dialog_wallet";
import { Component, Watch } from "vue-property-decorator";
import DialogRechargeMediator from "../mediator/DialogRechargeMediator";
import DialogRechargeProxy from "../proxy/DialogRechargeProxy";
import SkinVariable from "@/_skin004/core/SkinVariable";

@Component
export default class DialogRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    selfProxy: SelfProxy = getProxy(SelfProxy);
    pageData = this.myProxy.pageData;
    SkinVariable = SkinVariable;
    constructor() {
        super(DialogRechargeMediator);
    }

    //是否显示越南盾银行 兑换
    public get isShowBankVnd() : boolean {
        if(this.myProxy.exchangeProxy.pageData.form.payment_method_type == 6)
        {
            return true;
        }
        return false;
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
        //this.pageData.bShow = false;
    }
    gowater(){
        dialog_gold_water.show();
    }
    viewDetail() {
        dialog_wallet.show(2, 0);
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow)
        {
            this.myProxy.exchangeProxy.resetform();
            this.myProxy.transferProxy.resetform();
        }
    }
}
