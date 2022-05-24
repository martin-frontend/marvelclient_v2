import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogRecordMineMediator from "../mediator/DialogRecordMineMediator";
import DialogRecordMineProxy from "../proxy/DialogRecordMineProxy";

@Component
export default class DialogRecordMine extends AbstractView {
    myProxy: DialogRecordMineProxy = this.getProxy(DialogRecordMineProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogRecordMineMediator);
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
