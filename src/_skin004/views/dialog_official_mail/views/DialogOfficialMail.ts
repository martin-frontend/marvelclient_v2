import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogOfficialMailMediator from "../mediator/DialogOfficialMailMediator";
import DialogOfficialMailProxy from "../proxy/DialogOfficialMailProxy";
import LangUtil from "@/core/global/LangUtil";

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
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }

    onCopy() {
        this.myProxy.copyMail();
    }
}
