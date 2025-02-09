import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogTestMediator from "../mediator/DialogTestMediator";
import DialogTestProxy from "../proxy/DialogTestProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogTest extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogTestProxy = this.getProxy(DialogTestProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogTestMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
        }
    }
}
