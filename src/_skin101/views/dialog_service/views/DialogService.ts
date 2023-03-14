import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogServiceMediator from "../mediator/DialogServiceMediator";
import DialogServiceProxy from "../proxy/DialogServiceProxy";

@Component
export default class DialogService extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogServiceProxy = this.getProxy(DialogServiceProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogServiceMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}
