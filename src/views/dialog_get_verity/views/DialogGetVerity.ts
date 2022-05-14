import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { Component, Watch } from "vue-property-decorator";
import DialogGetVerityMediator from "../mediator/DialogGetVerityMediator";
import DialogGetVerityProxy from "../proxy/DialogGetVerityProxy";

@Component
export default class DialogGetVerity extends AbstractView {
    myProxy: DialogGetVerityProxy = this.getProxy(DialogGetVerityProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogGetVerityMediator);
    }

    getVerity() {
        this.myProxy.api_public_auth_code();
    }

    onSend() {
        this.myProxy.api_public_email_send();
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}
