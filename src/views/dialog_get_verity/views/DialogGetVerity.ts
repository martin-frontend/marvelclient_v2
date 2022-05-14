import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { Component, Watch } from "vue-property-decorator";
import DialogGetVerityMediator from "../mediator/DialogGetVerityMediator";
import DialogGetVerityProxy from "../proxy/DialogGetVerityProxy";

@Component
export default class DialogGetVerity extends AbstractView {
    myProxy: DialogGetVerityProxy = this.getProxy(DialogGetVerityProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogGetVerityMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            // this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
        }
    }
}
