import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogActivityMediator from "../mediator/DialogActivityMediator";
import DialogActivityProxy from "../proxy/DialogActivityProxy";
import NoticeProxy from "@/proxy/NoticeProxy";
import PageBlur from "@/_skin030/core/PageBlur";
import PanelUtil from "@/_skin030/core/PanelUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";

@Component
export default class DialogActivity extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogActivityProxy = this.getProxy(DialogActivityProxy);
    pageData = this.myProxy.pageData;
    noticeProxy: NoticeProxy = this.getProxy(NoticeProxy);

    constructor() {
        super(DialogActivityMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            this.myProxy.api_plat_activity();
        }
    }

    onDetail(item: any) {
        //this.pageData.bShow = false;
        setTimeout(() => {
            PanelUtil.openpanel_activity_detail(item);
        }, 100);
        this.onClose();
    }

    @Watch("$mobile")
    onWatchXS() {
        if (this.pageData.bShow) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.api_plat_activity();
        }
    }

    onPageChange(val: number) {
        this.pageData.listQuery.page_count = val;
        this.myProxy.api_plat_activity();
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }
}
