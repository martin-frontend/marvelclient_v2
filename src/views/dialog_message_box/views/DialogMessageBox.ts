import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import LangUtil from "@/core/global/LangUtil";
import { Component, Watch } from "vue-property-decorator";
import DialogMessageBoxMediator from "../mediator/DialogMessageBoxMediator";
import DialogMessageBoxProxy from "../proxy/DialogMessageBoxProxy";
@Component
export default class DialogMessageBox extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogMessageBoxProxy = this.getProxy(DialogMessageBoxProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogMessageBoxMediator);
    }

    public get isMultMessage(): boolean {
        return !(typeof this.pageData.data.message == "string");
    }

    onOK() {
        this.myProxy.handlerOK();
    }

    onCancel() {
        this.myProxy.handlerCancel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}
