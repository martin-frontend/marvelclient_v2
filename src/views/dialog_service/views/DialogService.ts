import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch } from "vue-property-decorator";
import DialogServiceMediator from "../mediator/DialogServiceMediator";
import DialogServiceProxy from "../proxy/DialogServiceProxy";

export default class DialogService extends AbstractView {
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
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            this.myProxy.api_xxx();
        }
    }
}
