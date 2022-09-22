import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogGoogleVerificationMediator from "../mediator/DialogGoogleVerificationMediator";
import DialogGoogleVerificationProxy from "../proxy/DialogGoogleVerificationProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogGoogleVerification extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogGoogleVerificationProxy = this.getProxy(DialogGoogleVerificationProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogGoogleVerificationMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            BlurUtil(this.pageData.bShow);
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
        }
    }
}
