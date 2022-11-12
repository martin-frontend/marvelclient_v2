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

@Component
export default class DialogDirectlySetting extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlySettingProxy = this.getProxy(DialogDirectlySettingProxy);
    pageData = this.myProxy.pageData;

    playerInfo = this.myProxy.playerInfo;
    limit = this.myProxy.limit;
    constructor() {
        super(DialogDirectlySettingMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }
    //是否能显示其他
    public get isAgents() : boolean {
        if(this.limit.enable_all == 1)
        {
            return true;
        }
        return false
    }
    //是否能设置占比
    public get isAgents_rate() : boolean {
        
        if(this.limit.enable_credit_rate == 1)
        {
            return true;
        }
        return false

    }
    
    //用户资产设置
    assetSettings()
    {
        dialog_directly_transfer.show(this.playerInfo);
    }
    agentSetting()
    {
        console.log("打开---代理占比设置")
        dialog_directly_agentset.show(this.playerInfo);
    }
    //资产设置--  增加
    assetSettings_add()
    {
        dialog_directly_transfer.show(this.playerInfo,true);
    }
    //esayBet投注额设置 按钮
    esayBetSetting()
    {
        console.log("打开---esayBet投注额设置")
        dialog_directly_easybetset.show(this.playerInfo);
    } 
    //返水设置
    backWatherSettings()
    {
        dialog_directly_backwater.show(this.playerInfo);
    }
    search()
    {
        console.log("点击搜索")
    }

    handlerUpdate(val: any) {
        this.myProxy.agent_direct_user_update();
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
