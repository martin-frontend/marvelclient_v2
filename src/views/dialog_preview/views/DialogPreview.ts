import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogPreviewMediator from "../mediator/DialogPreviewMediator";
import DialogPreviewProxy from "../proxy/DialogPreviewProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogPreview extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogPreviewProxy = this.getProxy(DialogPreviewProxy);
    pageData = this.myProxy.pageData;
    QRCode = QRCode;

    constructor() {
        super(DialogPreviewMediator);
    }

    // @Watch("pageData.address")
    onWatchAddress() {
        const div: any = this.$refs.qrcode;
        div.innerHTML = "";
        // new this.QRCode(div, this.pageData.address);
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }

    onClose() {
        this.pageData.bShow = false;
    }
}
