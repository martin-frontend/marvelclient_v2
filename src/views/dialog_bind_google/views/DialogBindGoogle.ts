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
    test = ''
    userInfo = this.selfProxy.userInfo;

    constructor() {
        super(DialogBindGoogleMediator);
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
