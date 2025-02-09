import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import dialog_recharge from "@/_skin101/views/dialog_recharge";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import DialogRecordRechargeMediator from "../mediator/DialogRecordRechargeMediator";
import DialogRecordRechargeProxy from "../proxy/DialogRecordRechargeProxy";

@Component
export default class DialogRecordRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRecordRechargeProxy = this.getProxy(DialogRecordRechargeProxy);
    pageData = this.myProxy.pageData;
    statusOptions = this.myProxy.statusOptions;
    statusColorOptions = this.myProxy.statusColorOptions;

    plat_coins = GamePlatConfig.config.plat_coins;
    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogRecordRechargeMediator);
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
            this.myProxy.api_user_var_recharge_list();
        }
    }

    @Watch("$vuetify.breakpoint.xsOnly")
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
}
