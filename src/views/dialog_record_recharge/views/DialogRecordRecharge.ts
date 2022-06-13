import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import dialog_recharge from "@/views/dialog_recharge";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import DialogRecordRechargeMediator from "../mediator/DialogRecordRechargeMediator";
import DialogRecordRechargeProxy from "../proxy/DialogRecordRechargeProxy";
import { handleScroll } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class DialogRecordRecharge extends AbstractView {
    LangUtil = LangUtil;
    handleScroll = handleScroll;
    myProxy: DialogRecordRechargeProxy = this.getProxy(DialogRecordRechargeProxy);
    pageData = this.myProxy.pageData;
    statusOptions = this.myProxy.statusOptions;

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

    @Watch("pageData.list.length")
    onWatchList() {
        if (this.pageData.list.length > 0) {
            this.handlerScroll();
        }
    }

    // 监听手机版scroll 到底加载
    @Watch("scrollStatus.flag")
    onScroll() {
        if (this.myProxy.pageData.pageInfo.pageCurrent < this.myProxy.pageData.pageInfo.pageCount) {
            this.myProxy.pageData.listQuery.page_count++;
            this.myProxy.api_user_var_recharge_list();
        }
    }

    handlerScroll() {
        if (this.$vuetify.breakpoint.xsOnly) {
            this.$nextTick(() => {
                GlobalVar.HTMLElement.dom = document.querySelector(".table_data") as HTMLElement;
                GlobalVar.HTMLElement.dom.removeEventListener("scroll", this.handleScroll);
                GlobalVar.HTMLElement.dom.addEventListener("scroll", this.handleScroll);
            });
        }
    }

    onPageChange(val: any) {
        this.pageData.listQuery.page_count = val;
        this.myProxy.api_user_var_recharge_list();
    }

    get listHeight() {
        if (this.$vuetify.breakpoint.xsOnly) {
            return this.$vuetify.breakpoint.height - 125;
        } else {
            return 368;
        }
    }
}
