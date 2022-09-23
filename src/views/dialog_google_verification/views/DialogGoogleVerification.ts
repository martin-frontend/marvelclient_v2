import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogGoogleVerificationMediator from "../mediator/DialogGoogleVerificationMediator";
import DialogGoogleVerificationProxy from "../proxy/DialogGoogleVerificationProxy";
import LangUtil from "@/core/global/LangUtil";
import DialogLoginProxy from "@/views/dialog_login/proxy/DialogLoginProxy";

@Component
export default class DialogGoogleVerification extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogGoogleVerificationProxy = this.getProxy(DialogGoogleVerificationProxy);
    loginProxy: DialogLoginProxy = this.getProxy(DialogLoginProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogGoogleVerificationMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    handlerLogin() {
        this.loginProxy.api_user_login(this.pageData.form.google_code);
    }

    get disabled() {
        return this.pageData.form.google_code == "";
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            BlurUtil(this.pageData.bShow);
        } else {
            this.myProxy.resetForm();
        }
    }
}
