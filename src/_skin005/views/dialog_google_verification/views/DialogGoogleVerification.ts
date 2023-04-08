import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogGoogleVerificationMediator from "../mediator/DialogGoogleVerificationMediator";
import DialogGoogleVerificationProxy from "../proxy/DialogGoogleVerificationProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogGoogleVerification extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogGoogleVerificationProxy = this.getProxy(DialogGoogleVerificationProxy);
    loginProxy = PanelUtil.getProxy_login;
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogGoogleVerificationMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    handlerLogin() {
        this.loginProxy.api_user_login(this.pageData.form.google_code);
    }

    get disabled() {
        return this.pageData.form.google_code == "";
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow == false) {
            this.myProxy.resetForm();
        }
    }
}
