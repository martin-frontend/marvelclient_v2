import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import LangUtil from "@/core/global/LangUtil";
import { Component, Watch } from "vue-property-decorator";
import DialogGetVerityMediator from "../mediator/DialogGetVerityMediator";
import DialogGetVerityProxy from "../proxy/DialogGetVerityProxy";

@Component
export default class DialogGetVerity extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogGetVerityProxy = this.getProxy(DialogGetVerityProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogGetVerityMediator);
    }

    getVerity() {
        this.myProxy.api_public_auth_code();
    }

    onSend() {
        if (this.pageData.category == 0) {
            this.myProxy.api_public_email_send();
        } else {
            this.myProxy.api_public_sms_send();
        }
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}
