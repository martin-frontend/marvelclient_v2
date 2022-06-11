import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import dialog_activity_detail from "@/views/dialog_activity_detail";
import { Watch, Component } from "vue-property-decorator";
import DialogActivityMediator from "../mediator/DialogActivityMediator";
import DialogActivityProxy from "../proxy/DialogActivityProxy";

@Component
export default class DialogActivity extends AbstractView {
    LangUtil = LangUtil;
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
