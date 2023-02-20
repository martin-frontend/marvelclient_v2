import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogServiceMediator from "../mediator/DialogServiceMediator";
import DialogServiceProxy from "../proxy/DialogServiceProxy";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogService extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogServiceProxy = this.getProxy(DialogServiceProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogServiceMediator);
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
