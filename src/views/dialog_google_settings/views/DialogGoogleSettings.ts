import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogGoogleSettingsMediator from "../mediator/DialogGoogleSettingsMediator";
import DialogGoogleSettingsProxy from "../proxy/DialogGoogleSettingsProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogGoogleSettings extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogGoogleSettingsProxy = this.getProxy(DialogGoogleSettingsProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogGoogleSettingsMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    handlerNextStep() {
        this.myProxy.nextStep();
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
