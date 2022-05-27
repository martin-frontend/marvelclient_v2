import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyMediator from "../mediator/DialogDirectlyMediator";
import DialogDirectlyProxy from "../proxy/DialogDirectlyProxy";
import DialogPromotionFloorProxy from "@/views/dialog_promotion_floor/proxy/DialogPromotionFloorProxy";
import dialog_promotion_floor from "@/views/dialog_promotion_floor";

@Component
export default class DialogDirectly extends AbstractView {
    dialogPromotionFloorProxy: DialogPromotionFloorProxy = this.getProxy(DialogPromotionFloorProxy);
    myProxy: DialogDirectlyProxy = this.getProxy(DialogDirectlyProxy);
    pageData = this.myProxy.pageData;

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogDirectlyMediator);
    }

    handlerSetting(data: any) {
        this.dialogPromotionFloorProxy.setSelectedFloorData(data);
        dialog_promotion_floor.show();
        console.warn("handlerSetting", data);
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
            this.myProxy.api_user_var_agent_direct_list();
        }
    }

    search() {
        this.myProxy.pageData.list = [];
        this.myProxy.parameter.direct_user_id = this.myProxy.pageData.search;
        this.myProxy.api_user_var_agent_direct_list();
    }

    onPageChange():void {
        this.myProxy.api_user_var_agent_direct_list();
    }
}
