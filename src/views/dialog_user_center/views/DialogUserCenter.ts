import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogUserCenterMediator from "../mediator/DialogUserCenterMediator";
import DialogUserCenterProxy from "../proxy/DialogUserCenterProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";

@Component
export default class DialogUserCenter extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogUserCenterProxy = this.getProxy(DialogUserCenterProxy);
    pageData = this.myProxy.pageData;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    userInfo = this.selfProxy.userInfo;

    constructor() {
        super(DialogUserCenterMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }

    onLoginOut() {
        this.selfProxy.api_user_logout();
    }
}
