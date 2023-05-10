import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import DialogRecordRechargeMediator from "../mediator/DialogRecordRechargeMediator";
import DialogRecordRechargeProxy from "../proxy/DialogRecordRechargeProxy";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import { changeDateShow, amountFormat } from "@/core/global/Functions";

@Component
export default class DialogRecordRecharge extends AbstractView {
    LangUtil = LangUtil;
    amountFormat = amountFormat;
    myProxy: DialogRecordRechargeProxy = this.getProxy(DialogRecordRechargeProxy);
    pageData = this.myProxy.pageData;
    statusOptions = this.myProxy.statusOptions;

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogRecordRechargeMediator);
    }

    onCopy(value: string) {
        CopyUtil(value);
        PanelUtil.message_info(LangUtil("复制成功"));
    }

    onClose() {
        this.pageData.bShow = false;
        // setTimeout(() => {
        //     dialog_recharge.show();
        // }, 100);
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_recharge_list();
        }
    }

    @Watch("$mobile")
    onWatchXS() {
        if (this.pageData.bShow) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.api_user_var_recharge_list();
        }
    }

    onPageChange(val: any) {
        this.pageData.listQuery.page_count = val;
        this.myProxy.api_user_var_recharge_list();
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
            case 1:
                return "textGreen--text";
            case 2:
                return "red--text";
            default:
                return "textYellow--text";
        }
    }
}
