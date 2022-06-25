import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import DialogDirectlyProxy from "@/views/dialog_directly/proxy/DialogDirectlyProxy";
import { Watch, Component } from "vue-property-decorator";
import DialogPromotionFloorMediator from "../mediator/DialogPromotionFloorMediator";
import DialogPromotionFloorProxy from "../proxy/DialogPromotionFloorProxy";

@Component
export default class DialogPromotionFloor extends AbstractView {
    private dialogDirectlyProxy: DialogDirectlyProxy = this.getProxy(DialogDirectlyProxy);
    myProxy: DialogPromotionFloorProxy = this.getProxy(DialogPromotionFloorProxy);
    pageData = this.myProxy.pageData;
    LangUtil = LangUtil;

    constructor() {
        super(DialogPromotionFloorMediator);
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

    get isCheckedAmount(): boolean {
        const { amount } = this.pageData;
        return this.checkAmount(amount);
    }

    private checkAmount(id: any) {
        return id.length > 0 ? true : false;
    }

    setFloor(): void {
        this.pageData.loading = true;
        this.myProxy.api_user_var_agent_var_update();
    }
}
