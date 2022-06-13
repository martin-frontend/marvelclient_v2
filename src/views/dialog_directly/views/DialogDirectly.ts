import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import DialogPromotionFloorProxy from "@/views/dialog_promotion_floor/proxy/DialogPromotionFloorProxy";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyMediator from "../mediator/DialogDirectlyMediator";
import DialogDirectlyProxy from "../proxy/DialogDirectlyProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";
import { handleScroll } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class DialogDirectly extends AbstractView {
    dialogPromotionFloorProxy: DialogPromotionFloorProxy = this.getProxy(DialogPromotionFloorProxy);
    myProxy: DialogDirectlyProxy = this.getProxy(DialogDirectlyProxy);
    pageData = this.myProxy.pageData;
    LangUtil = LangUtil;
    handleScroll = handleScroll;

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogDirectlyMediator);
    }

    handlerSetting(data: any) {
        if (this.pageData.enable_set_promotion_floor === 1) {
            const agent_user_id = data.user_id;
            let val: number = 0;
            if (!Array.isArray(data.promotion_floor)) val = data.promotion_floor["0"];
            this.myProxy.setFloorRangeData(agent_user_id, val);
        } else {
            dialog_message.warn(LangUtil("无法设置保底"));
        }
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_agent_direct_list();
            this.myProxy.pageData.isMobile = this.$vuetify.breakpoint.width < 600;
        }
    }

    @Watch("pageData.list.length")
    onWatchList() {
        if (this.pageData.list.length > 0) {
            this.handlerScroll();
        }
    }

    // 监听手机版scroll 到底加载
    @Watch("scrollStatus.flag")
    onScroll() {
        if (this.myProxy.pageData.pageInfo.pageCurrent < this.myProxy.pageData.pageInfo.pageCount) {
            this.myProxy.pageData.listQuery.page_count++;
            this.myProxy.api_user_var_agent_direct_list();
        }
    }

    handlerScroll() {
        if (this.$vuetify.breakpoint.xsOnly) {
            this.$nextTick(() => {
                GlobalVar.HTMLElement.dom = document.querySelector(".table_data") as HTMLElement;
                GlobalVar.HTMLElement.dom.removeEventListener("scroll", this.handleScroll);
                GlobalVar.HTMLElement.dom.addEventListener("scroll", this.handleScroll);
            });
        }
    }

    search() {
        this.pageData.loading = true;
        this.myProxy.pageData.list = [];
        this.myProxy.parameter.direct_user_id = this.myProxy.pageData.search;
        this.myProxy.api_user_var_agent_direct_list();
    }

    onPageChange(): void {
        this.pageData.loading = true;
        this.myProxy.api_user_var_agent_direct_list();
    }

    get heightClass() {
        if (!this.$vuetify.breakpoint.xsOnly) {
            return "card-height";
        }
        return "";
    }
}
