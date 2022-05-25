import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyMediator from "../mediator/DialogDirectlyMediator";
import DialogDirectlyProxy from "../proxy/DialogDirectlyProxy";
import dialog_promotion_floor from "@/views/dialog_promotion_floor";

@Component
export default class DialogDirectly extends AbstractView {
    myProxy: DialogDirectlyProxy = this.getProxy(DialogDirectlyProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogDirectlyMediator);
    }

    handlerSetting() {
        dialog_promotion_floor.show();
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

    search() {
        console.log('click search');
    }
}
