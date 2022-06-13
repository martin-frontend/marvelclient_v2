import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogRecordMineMediator from "../mediator/DialogRecordMineMediator";
import DialogRecordMineProxy from "../proxy/DialogRecordMineProxy";
import dialog_record_mine_detail from "@/views/dialog_record_mine_detail";
import Assets from "@/assets/Assets";
import LangUtil from "@/core/global/LangUtil";
import { handleScroll } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class DialogRecordMine extends AbstractView {
    myProxy: DialogRecordMineProxy = this.getProxy(DialogRecordMineProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;
    LangUtil = LangUtil;
    handleScroll = handleScroll;
    scrollStatus = GlobalVar.scrollStatus;

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogRecordMineMediator);
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
            this.myProxy.api_user_var_backwater();
            this.myProxy.pageData.isMobile = this.$vuetify.breakpoint.width < 600;
        }
    }

    @Watch("pageData.list.length")
    onWatchList() {
        if (this.pageData.list.length > 0) {
            console.log("handlerScroll");
            this.handlerScroll();
        }
    }

    // 监听手机版scroll 到底加载
    @Watch("scrollStatus.flag")
    onScroll() {
        console.warn("end");
        if (this.myProxy.pageData.pageInfo.pageCurrent < this.myProxy.pageData.pageInfo.pageCount) {
            this.myProxy.pageData.listQuery.page_count++;
            this.myProxy.api_user_var_backwater();
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

    handlerDetail(item: any) {
        this.myProxy.api_user_var_backwater_var(item.backwater_id);
    }
    /**分页 */
    onPageChange(val: any) {
        this.listQuery.page_count = val;
        this.myProxy.api_user_var_backwater();
    }

    getDateTime(data: any) {
        // 2022-05-25 18:51:10
        const md = `${data.split(" ")[0].split("-")[1]}-${data.split(" ")[0].split("-")[2]}`;
        const ti = data.split(" ")[1];
        return `${md} ${ti}`;
    }
}
