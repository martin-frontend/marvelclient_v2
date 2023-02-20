import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogOfficialMailMediator from "../mediator/DialogOfficialMailMediator";
import DialogOfficialMailProxy from "../proxy/DialogOfficialMailProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogOfficialMail extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogOfficialMailProxy = this.getProxy(DialogOfficialMailProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogOfficialMailMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }

    onCopy() {
        this.myProxy.copyMail();
    }
}
