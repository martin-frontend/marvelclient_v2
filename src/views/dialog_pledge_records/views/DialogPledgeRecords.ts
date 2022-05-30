import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import dialog_message from "@/views/dialog_message";
import { Watch, Component } from "vue-property-decorator";
import DialogPledgeRecordsMediator from "../mediator/DialogPledgeRecordsMediator";
import DialogPledgeRecordsProxy from "../proxy/DialogPledgeRecordsProxy";

@Component
export default class DialogPledgeRecords extends AbstractView {
    myProxy: DialogPledgeRecordsProxy = this.getProxy(DialogPledgeRecordsProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;

    constructor() {
        super(DialogPledgeRecordsMediator);
    }

    onTabClick(cate: number) {
        console.warn(cate);
        this.listQuery.cate = cate;
        this.listQuery.page_count = 1;
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            // this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
        }
    }

    get listHeight() {
        if (this.$vuetify.breakpoint.xsOnly) {
            return this.$vuetify.breakpoint.height - 210;
        } else {
            return 450;
        }
    }

    get deListHeight() {
        if (this.$vuetify.breakpoint.xsOnly) {
            return this.$vuetify.breakpoint.height - 150;
        } else {
            return 450;
        }
    }
}
