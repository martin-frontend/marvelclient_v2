import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import DialogPromotionFloorProxy from "@/views/dialog_promotion_floor/proxy/DialogPromotionFloorProxy";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyMediator from "../mediator/DialogDirectlyMediator";
import DialogDirectlyProxy from "../proxy/DialogDirectlyProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";
//import dialog_bet_record from "@/views/dialog_bet_record";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_directly_setting from "../../dialog_directly_setting";
import dialog_bet_record from "../../dialog_bet_record";
import dialog_add_user from "../../dialog_directly_adduser";

@Component
export default class DialogDirectly extends AbstractView {
    dialogPromotionFloorProxy: DialogPromotionFloorProxy = this.getProxy(DialogPromotionFloorProxy);
    myProxy: DialogDirectlyProxy = this.getProxy(DialogDirectlyProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;
    LangUtil = LangUtil;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    limitinfo = this.myProxy.limitinfo;
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

    @Watch("pageData.search")
    onWatchSearch() {
        if (this.pageData.search != "") {
            this.pageData.buttonActive = true;
        } else {
            this.pageData.buttonActive = false;
        }
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_agent_direct_list();
        } else {
            this.myProxy.pageData.list = [];
        }
    }

    @Watch("$vuetify.breakpoint.xsOnly")
    onWatchXS() {
        if (this.pageData.bShow) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.api_user_var_agent_direct_list();
        }
    }

    search() {
        this.pageData.loading = true;
        this.myProxy.pageData.list = [];
        this.myProxy.parameter.direct_user_id = this.myProxy.pageData.search;
        this.pageData.listQuery.page_count = 1;
        this.myProxy.api_user_var_agent_direct_list();
    }

    onPageChange(val: any) {
        this.listQuery.page_count = val;
        this.myProxy.api_user_var_agent_direct_list();
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }

    handlerShowBetRecord(agent_user_id: any) {
        dialog_bet_record.show(agent_user_id);
    }

    handlerShowDialogSet(agent_user: any) {
        //dialog_directly_setting.show(agent_user);
        dialog_directly_setting.show({ userinfo: agent_user, limitinfo: this.limitinfo });
    }
    handlerShowAddUser() {
        dialog_add_user.show();
    }
}
