import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { Watch } from "vue-property-decorator";
import DialogContractMediator from "../mediator/DialogContractMediator";
import DialogContractProxy from "../proxy/DialogContractProxy";

export default class DialogContract extends AbstractView {
    myProxy: DialogContractProxy = this.getProxy(DialogContractProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogContractMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}
