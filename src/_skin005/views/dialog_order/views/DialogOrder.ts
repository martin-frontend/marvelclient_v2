import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogOrderMediator from "../mediator/DialogOrderMediator";
import DialogOrderProxy from "../proxy/DialogOrderProxy";
import LangUtil from "@/core/global/LangUtil";
import PageBlur from "@/_skin005/core/PageBlur";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogOrder extends AbstractView {
    LangUtil = LangUtil;

    myProxy: DialogOrderProxy = this.getProxy(DialogOrderProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogOrderMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (!this.pageData.bShow) {
            this.myProxy.resetQuery();
        }
    }
}
