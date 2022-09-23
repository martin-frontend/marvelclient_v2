import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogBindGoogleMediator from "../mediator/DialogBindGoogleMediator";
import DialogBindGoogleProxy from "../proxy/DialogBindGoogleProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";

@Component
export default class DialogBindGoogle extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogBindGoogleProxy = this.getProxy(DialogBindGoogleProxy);
    pageData = this.myProxy.pageData;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    userInfo = this.selfProxy.userInfo;

    constructor() {
        super(DialogBindGoogleMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    handlerBindGoogle() {
        this.myProxy.api_user_bind_google_key_var();
    }

    get disabled() {
        return this.userInfo.is_google_scan == 1
            ? !this.pageData.form.google_code || !this.pageData.form.old_google_code
            : !this.pageData.form.google_code;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            BlurUtil(this.pageData.bShow);
            this.myProxy.resetForm();
        }
    }
}
