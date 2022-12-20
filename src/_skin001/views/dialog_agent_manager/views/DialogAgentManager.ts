import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import DialogPromotionFloorProxy from "@/views/dialog_promotion_floor/proxy/DialogPromotionFloorProxy";
import { Watch, Component } from "vue-property-decorator";
import DialogAgentManagerMediator from "../mediator/DialogAgentManagerMediator";
import DialogAgentManagerProxy from "../proxy/DialogAgentManagerProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";
//import dialog_bet_record from "@/views/dialog_bet_record";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_directly_setting from "../../dialog_directly_setting";
import dialog_bet_record from "../../dialog_bet_record";
import dialog_add_user from "../../dialog_directly_adduser";
import dialog_statistics_credit from "../../dialog_statistics_credit";
import dialog_directly_my from "../../dialog_directly_my";
import dialog_directly_backwater from "../../dialog_directly_backwater";
import Constant from "@/core/global/Constant";

@Component
export default class DialogAgentManager extends AbstractView {
    dialogPromotionFloorProxy: DialogPromotionFloorProxy = this.getProxy(DialogPromotionFloorProxy);
    myProxy: DialogAgentManagerProxy = this.getProxy(DialogAgentManagerProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;
    LangUtil = LangUtil;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    limitinfo = this.myProxy.limitinfo;
    commonIcon = Assets.commonIcon;

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
            dialog_message.warn(LangUtil("无法设置保底"));
        }
    }

    onClose() {
        this.pageData.bShow = false;
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
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_agent_direct_list();
        } else {
            this.myProxy.pageData.list = [];
        }
    }

    @Watch("$vuetify.breakpoint.mobile")
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
        dialog_bet_record.show(agent_user_id, "", "", true, {
            bShowUserId: true,
        });
    }

    handlerShowDialogSet(agent_user: any) {
        //dialog_directly_setting.show(agent_user);
        dialog_directly_setting.show({ userinfo: agent_user, limitinfo: this.limitinfo });
    }
    handlerShowAddUser() {
        dialog_add_user.show();
    }
    handlerShowCreditTable() {
        dialog_statistics_credit.show();
    }

    opendialog_my() {
        dialog_directly_my.show();
    }
    opendialog_myWater() {
        dialog_directly_backwater.show(null, true);
    }
    fontAuto() {
        const touzhu_node_parent = document.getElementById("touzhu_node_parent");
        const touzhu_node = document.getElementById("touzhu_node");

        //获取投注按钮的宽度
        const touzhi_width = touzhu_node?.scrollWidth;
    }
    getMoneyColor(str: any): string {
        if (typeof str == "number") {
            if (str < 0) {
                return "red--text";
            } else if (str > 0) {
                return "colorGreen--text";
            } else {
                return "";
            }
        }
        const newstr = str.replace("$", "");
        const amount = Number(newstr);
        if (amount == 0) {
            return "";
        }
        return !!str && str.search("-") == -1 ? "colorGreen--text" : "red--text";
    }
    getMoneyValue(str: any): string {
        if (typeof str == "number") {
            if (str > 0) {
                return "+" + str;
            } else {
                return str + "";
            }
        }
        const newstr = str.replace("$", "");
        const amount = Number(newstr);
        if (amount == 0) {
            return str;
        }

        if (!!str && str.search("-") == -1) return "+" + str;
        return str;
    }
}
