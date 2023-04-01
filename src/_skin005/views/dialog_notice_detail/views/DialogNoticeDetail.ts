import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogNoticeDetailMediator from "../mediator/DialogNoticeDetailMediator";
import DialogNoticeDetailProxy from "../proxy/DialogNoticeDetailProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PageBlur from "@/_skin005/core/PageBlur";

@Component
export default class DialogNoticeDetail extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogNoticeDetailProxy = this.getProxy(DialogNoticeDetailProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogNoticeDetailMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }
}
