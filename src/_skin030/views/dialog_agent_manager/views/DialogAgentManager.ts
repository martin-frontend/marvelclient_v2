import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";

import { Watch, Component } from "vue-property-decorator";
import DialogAgentManagerMediator from "../mediator/DialogAgentManagerMediator";
import DialogAgentManagerProxy from "../proxy/DialogAgentManagerProxy";

import LangUtil from "@/core/global/LangUtil";

import Constant from "@/core/global/Constant";
import PanelUtil from "@/_skin030/core/PanelUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import { getMoneyColor, getMoneyValue } from "@/_skin030/core/ColorfullText";

@Component
export default class DialogAgentManager extends AbstractView {
    dialogPromotionFloorProxy = PanelUtil.getProxy_promotion_floor;

    myProxy: DialogAgentManagerProxy = this.getProxy(DialogAgentManagerProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;
    limitinfo = this.myProxy.limitinfo;
    commonIcon = Assets.commonIcon;

    getMoneyColor = getMoneyColor;
    getMoneyValue = getMoneyValue;

    constructor() {
        super(DialogAgentManagerMediator);
    }

    handlerSetting(data: any) {
        if (this.pageData.enable_set_promotion_floor === 1) {
            const agent_user_id = data.user_id;
            let val: number = 0;
            if (!Array.isArray(data.promotion_floor)) val = data.promotion_floor["0"];
            this.myProxy.setFloorRangeData(agent_user_id, val);
        } else {
            PanelUtil.message_warn(LangUtil("无法设置保底"));
        }
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    //上级id
    public get invite_user_id(): any {
        return this.selfProxy.userInfo.invite_user_id;
        //return 1273623;
    }
    getConfigName(type: any) {
        return Constant.GameTypeText(type);
    }
    getBackWaterTxt(water_config: any): string {
        let str = "";
        if (!water_config) {
            return str;
        }
        const coinKeys = Object.keys(water_config);
        for (let index = 0; index < coinKeys.length; index++) {
            const element = coinKeys[index];
            if (element == "0") {
                continue;
            }
            str = str + this.getConfigName(element) + " " + water_config[element];
            if (index < coinKeys.length - 1) {
                str = str + "/ ";
            }
        }
        return str;
    }
    @Watch("myProxy.checkboxValue")
    onWatchCheckboxValue() {
        console.log("筛选修改");
        if (this.myProxy.checkboxValue.length > 0) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.api_user_var_agent_direct_list();
        }
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
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_agent_direct_list();
        } else {
            this.myProxy.pageData.list = [];
        }
    }

    @Watch("$mobile")
    onWatchXS() {
        if (this.pageData.bShow) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.api_user_var_agent_direct_list();
        }
    }

    search() {
        this.pageData.loading = true;
        this.myProxy.pageData.list = [];
        this.myProxy.parameter.direct_info = this.myProxy.pageData.search;
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
        PanelUtil.openpanel_bet_record(agent_user_id, "", "", true, {
            bShowUserId: true,
        });
    }

    handlerShowDialogSet(agent_user: any) {
        PanelUtil.openpanel_directly_setting({ userinfo: agent_user, limitinfo: this.limitinfo });
    }
    handlerShowAddUser() {
        PanelUtil.openpanel_directly_adduser();
    }
    handlerShowCreditTable() {
        PanelUtil.openpanel_statistics_credit();
    }

    opendialog_my() {
        PanelUtil.openpanel_directly_my();
    }
    opendialog_myWater() {
        PanelUtil.openpanel_directly_backwater(null, true);
    }
    fontAuto() {
        const touzhu_node_parent = document.getElementById("touzhu_node_parent");
        const touzhu_node = document.getElementById("touzhu_node");

        //获取投注按钮的宽度
        const touzhi_width = touzhu_node?.scrollWidth;
    }
}
