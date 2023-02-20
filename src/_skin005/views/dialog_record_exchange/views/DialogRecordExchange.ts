import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import DialogRecordExchangeMediator from "../mediator/DialogRecordExchangeMediator";
import DialogRecordExchangeProxy from "../proxy/DialogRecordExchangeProxy";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogRecordExchange extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRecordExchangeProxy = this.getProxy(DialogRecordExchangeProxy);
    pageData = this.myProxy.pageData;
    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogRecordExchangeMediator);
    }

    onCopy(value: string) {
        CopyUtil(value);
       PanelUtil.message_info(LangUtil("复制成功"));
    }

    onClose() {
        this.pageData.bShow = false;
        // setTimeout(() => {
        //     dialog_recharge.show();
        //     this.rechargeProxy.pageData.tabIndex = 1;
        // }, 100);
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
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
