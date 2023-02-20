import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogContractMediator from "../mediator/DialogContractMediator";
import DialogContractProxy from "../proxy/DialogContractProxy";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogContract extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogContractProxy = this.getProxy(DialogContractProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogContractMediator);
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
