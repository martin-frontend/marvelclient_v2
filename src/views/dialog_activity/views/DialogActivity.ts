import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import dialog_activity_detail from "@/views/dialog_activity_detail";
import { Watch, Component } from "vue-property-decorator";
import DialogActivityMediator from "../mediator/DialogActivityMediator";
import DialogActivityProxy from "../proxy/DialogActivityProxy";
import { handleScroll } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class DialogActivity extends AbstractView {
    LangUtil = LangUtil;
    handleScroll = handleScroll;
    myProxy: DialogActivityProxy = this.getProxy(DialogActivityProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogActivityMediator);
    }

    get listHeight() {
        if (this.$vuetify.breakpoint.xsOnly) {
            return this.$vuetify.breakpoint.height - 155;
        } else {
            return 468;
        }
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            this.myProxy.api_plat_activity();
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
            this.myProxy.api_plat_activity();
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

    onDetail(item: any) {
        this.pageData.bShow = false;
        dialog_activity_detail.show(item);
    }

    onPageChange(val: number) {
        this.pageData.listQuery.page_count = val;
        this.myProxy.api_plat_activity();
    }
}
