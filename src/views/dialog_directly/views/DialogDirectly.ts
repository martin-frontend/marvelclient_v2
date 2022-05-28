import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import DialogPromotionFloorProxy from "@/views/dialog_promotion_floor/proxy/DialogPromotionFloorProxy";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyMediator from "../mediator/DialogDirectlyMediator";
import DialogDirectlyProxy from "../proxy/DialogDirectlyProxy";

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
        console.log("handlerSetting", data);
        const agent_user_id = data.user_id;
        let val: number = 0;
        if (data.promotion_floor.length > 0) val = data.promotion_floor["0"];
        this.myProxy.setFloorRangeData(agent_user_id, val);
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

    onPageChange(): void {
        this.myProxy.api_user_var_agent_direct_list();
    }

    get listHeight() {
        if (this.$vuetify.breakpoint.xsOnly) {
            return this.$vuetify.breakpoint.height - 185;
        } else {
            return 450;
        }
    }
}
