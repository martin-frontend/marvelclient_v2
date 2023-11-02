import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import DialogRecordExchangeMediator from "../mediator/DialogRecordExchangeMediator";
import DialogRecordExchangeProxy from "../proxy/DialogRecordExchangeProxy";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import { changeDateShow, amountFormat } from "@/core/global/Functions";

@Component
export default class DialogRecordExchange extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRecordExchangeProxy = this.getProxy(DialogRecordExchangeProxy);
    pageData = this.myProxy.pageData;
    commonIcon = Assets.commonIcon;
    is_user_manual_refund = GamePlatConfig.config.is_user_manual_refund;
    amountFormat = amountFormat;
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

    @Watch("$mobile")
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
    getDate(str: string) {
        return changeDateShow(str);
    }
    getStateColor(state: number) {
        switch (state) {
            case 4:
            case 9:
                return "textGreen--text";
            case 5:
            case 6:
            case 7:
            case 8:
            case 13:
                return "red--text";
            default:
                return "textYellow--text";
        }
    }
    getStateText(state: number) {
        switch (state) {
            case 4:
            case 9:
                return LangUtil("成功");
            case 5:
            case 6:
            case 7:
            case 8:
            case 13:
                return LangUtil("失败");
            default:
                return LangUtil("进行中");
        }
    }
    onCancleOrder(item: any) {
        //console.log("取消订单---点击", item);
        PanelUtil.message_confirm({
            message: LangUtil("确定取消此兑换订单吗？"),
            okFun: () => {
                this.myProxy.api_user_var_exchange_manual_refund(item);
            },
        });
    }

    cancleChick(item: any) {
        //return true;
        return item.show_refund_btn;
        return item.status_ori == 1;
    }
    onBtnClickRemark(item: any) {
        if (!item.remark) return;
        PanelUtil.message_alert(item.remark);
    }
}
