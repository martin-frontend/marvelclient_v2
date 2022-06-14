import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import dialog_recharge from "@/views/dialog_recharge";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import DialogRecordExchangeMediator from "../mediator/DialogRecordExchangeMediator";
import DialogRecordExchangeProxy from "../proxy/DialogRecordExchangeProxy";
import { handleScroll } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class DialogRecordExchange extends AbstractView {
    LangUtil = LangUtil;
    handleScroll = handleScroll;
    myProxy: DialogRecordExchangeProxy = this.getProxy(DialogRecordExchangeProxy);
    pageData = this.myProxy.pageData;
    scrollStatus = GlobalVar.scrollStatus;

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
            this.myProxy.pageData.isMobile = this.$vuetify.breakpoint.width < 600;
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
            this.myProxy.api_user_var_exchange_order_list();
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
        this.myProxy.api_user_var_exchange_order_list();
    }

    get listHeight() {
        if (this.$vuetify.breakpoint.xsOnly) {
            return this.$vuetify.breakpoint.height - 255;
        } else {
            return 368;
        }
    }
}
