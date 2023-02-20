import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogPromotionFloorMediator from "../mediator/DialogPromotionFloorMediator";
import DialogPromotionFloorProxy from "../proxy/DialogPromotionFloorProxy";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogPromotionFloor extends AbstractView {
    myProxy: DialogPromotionFloorProxy = this.getProxy(DialogPromotionFloorProxy);
    pageData = this.myProxy.pageData;
    LangUtil = LangUtil;

    constructor() {
        super(DialogPromotionFloorMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        this.myProxy.resetData();
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
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
