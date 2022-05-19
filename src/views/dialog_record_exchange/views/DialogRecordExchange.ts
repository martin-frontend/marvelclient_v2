import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import dialog_recharge from "@/views/dialog_recharge";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import DialogRecordExchangeMediator from "../mediator/DialogRecordExchangeMediator";
import DialogRecordExchangeProxy from "../proxy/DialogRecordExchangeProxy";
@Component
export default class DialogRecordExchange extends AbstractView {
    myProxy: DialogRecordExchangeProxy = this.getProxy(DialogRecordExchangeProxy);
    pageData = this.myProxy.pageData;

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogRecordExchangeMediator);
    }

    onCopy(value: string) {
        CopyUtil(value);
    }

    onClose() {
        this.pageData.bShow = false;
        setTimeout(() => {
            dialog_recharge.show();
        }, 100);
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_exchange_order_list();
        }
    }
}
