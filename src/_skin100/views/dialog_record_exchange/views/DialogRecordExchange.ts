import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import dialog_recharge from "@/_skin100/views/dialog_recharge";
import DialogRechargeProxy from "@/_skin100/views/dialog_recharge/proxy/DialogRechargeProxy";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import DialogRecordExchangeMediator from "../mediator/DialogRecordExchangeMediator";
import DialogRecordExchangeProxy from "../proxy/DialogRecordExchangeProxy";

@Component
export default class DialogRecordExchange extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRecordExchangeProxy = this.getProxy(DialogRecordExchangeProxy);
    rechargeProxy: DialogRechargeProxy = this.getProxy(DialogRechargeProxy);
    pageData = this.myProxy.pageData;

    plat_coins = GamePlatConfig.config.plat_coins;
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
            this.rechargeProxy.pageData.tabIndex = 1;
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

    @Watch("$vuetify.breakpoint.xsOnly")
    onWatchXS() {
        if (this.pageData.bShow) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.api_user_var_exchange_order_list();
        }
    }

    onPageChange(val: any) {
        this.pageData.listQuery.page_count = val;
        this.myProxy.api_user_var_exchange_order_list();
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }
}
