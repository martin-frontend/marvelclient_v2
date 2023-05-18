import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogEmptyIframeMediator from "../mediator/DialogEmptyIframeMediator";
import DialogEmptyIframeProxy from "../proxy/DialogEmptyIframeProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogEmptyIframe extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogEmptyIframeProxy = this.getProxy(DialogEmptyIframeProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogEmptyIframeMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }
    get gameFrameClass() {
        if (this.$mobile) {
            return "frame-mobile";
        } else {
            return "frame";
        }
    }
    @Watch("pageData.bShow")
    onWatchShow() {

        
    }
}
