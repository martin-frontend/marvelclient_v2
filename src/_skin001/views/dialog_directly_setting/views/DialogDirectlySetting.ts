import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlySettingMediator from "../mediator/DialogDirectlySettingMediator";
import DialogDirectlySettingProxy from "../proxy/DialogDirectlySettingProxy";
import LangUtil from "@/core/global/LangUtil";

import dialog_directly_transfer from "../../dialog_directly_transfer";
import dialog_directly_backwater from "../../dialog_directly_backwater";
import dialog_directly_easybetset from "../../dialog_directly_easybetset";
import dialog_directly_agentset from "../../dialog_directly_agentset";

import dialog_directly_gameset from "../../dialog_directly_gameset";

import dialog_edit_remark from "../../dialog_edit_remark";
import dialog_message from "@/views/dialog_message";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import dialog_message_box from "@/views/dialog_message_box";

@Component
export default class DialogDirectlySetting extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlySettingProxy = this.getProxy(DialogDirectlySettingProxy);
    pageData = this.myProxy.pageData;
    isOpenWalletMenu = this.myProxy.isOpenWalletMenu;
    playerInfo = this.myProxy.playerInfo;

    formData = this.myProxy.formData;
    GamePlatConfig = GamePlatConfig;

    limit = this.myProxy.limit;
    constructor() {
        super(DialogDirectlySettingMediator);
    }

    get gold_info(): any {
        return this.myProxy.playerInfo.gold_info;
    }

    public get gameSwitchInfo(): number[] {
        const keys = Object.keys(this.myProxy.playerInfo.vendor_type_switch);
        let count = 0;
        let totleCount = 0;
        for (let index = 0; index < keys.length; index++) {
            const element = this.myProxy.playerInfo.vendor_type_switch[keys[index]];
            if (this.myProxy.playerInfo.vendor_type_switch[keys[index]] == 1) {
                count++;
            }
            if (this.myProxy.playerInfo.vendor_type_switch[keys[index]] != -1) {
                totleCount++;
            }
        }
        return [totleCount, count];
        //return "";
    }

    onClose() {
        this.pageData.bShow = false;
    }
    onItemClick(item: any) {
        this.formData.coin_name_unique = item;
    }
    //是否能显示其他
    public get isAgents(): boolean {
        if (this.limit.enable_all == 1) {
            return true;
        }
        return false;
    }
    //是否能设置占比
    public get isAgents_rate(): boolean {
        if (this.limit.enable_credit_rate == 1) {
            return true;
        }
        return false;
    }
    private copy(msg: any) {
        this.myProxy.copyId(msg);
        dialog_message.warn(LangUtil("复制成功"));
    }
    onEditRemark() {
        dialog_edit_remark.show(this.myProxy.playerInfo);
    }
    //用户资产设置
    assetSettings() {
        dialog_directly_transfer.show(this.playerInfo);
    }
    agentSetting() {
        //console.log("打开---代理占比设置")
        dialog_directly_agentset.show(this.playerInfo);
    }
    openGamesetPanel() {
        dialog_directly_gameset.show(this.playerInfo);
    }
    //资产设置--  增加
    assetSettings_add() {
        dialog_directly_transfer.show(this.playerInfo, true);
    }

    //资产设置--  清空
    assetSettings_clear() {
        //console.log("清空资产");

        const str = LangUtil("您是否要清空该代理下所有用户的资产？");
        dialog_message_box.confirm({
            message: str,
            okFun: () => {
                //console.log("点击确定，发送消息出去");
                this.myProxy.api_user_var_agent_direct_deduction_all();
            },
            cancelFun: () => {
                console.log("点击取消，将值变换回去");
            },
        });
    }

    //esayBet投注额设置 按钮
    esayBetSetting() {
        //console.log("打开---esayBet投注额设置")
        dialog_directly_easybetset.show(this.playerInfo);
    }
    //返水设置
    backWatherSettings() {
        dialog_directly_backwater.show(this.playerInfo);
    }
    search() {
        //console.log("点击搜索")
    }

    handlerUpdate(val: any) {
        //console.log("val   ", val);
        if (val == "98") {
            const str = LangUtil("您是否禁用此帐号，如果禁用，该用户所有下级都禁用");
            dialog_message_box.confirm({
                message: str,
                okFun: () => {
                    //console.log("点击确定，发送消息出去");
                    this.myProxy.agent_direct_user_update();
                },
                cancelFun: () => {
                    console.log("点击取消，将值变换回去");
                    //@ts-ignore
                    this.myProxy.playerInfo.status = 1;
                    //console.log("this.playerInfo.status  " ,this.playerInfo.status);
                },
            });
        } else this.myProxy.agent_direct_user_update();
    }
    handlerUpdate_creditset(val: any) {
        this.myProxy.agent_direct_user_update_duoceng();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            // this.myProxy.resetQuery();
            //this.myProxy.api_user_var_fetch_direct_user_info(this.playerInfo.user_id);
        }
        BlurUtil(this.pageData.bShow);
    }
}
