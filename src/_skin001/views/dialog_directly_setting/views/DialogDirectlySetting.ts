import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlySettingMediator from "../mediator/DialogDirectlySettingMediator";
import DialogDirectlySettingProxy from "../proxy/DialogDirectlySettingProxy";
import LangUtil from "@/core/global/LangUtil";

import dialog_directly_transfer from "../../dialog_directly_transfer";
import dialog_directly_backwater from "../../dialog_directly_backwater";

@Component
export default class DialogDirectlySetting extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlySettingProxy = this.getProxy(DialogDirectlySettingProxy);
    pageData = this.myProxy.pageData;

    playerInfo = this.myProxy.playerInfo;

    constructor() {
        super(DialogDirectlySettingMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    //用户资产设置
    assetSettings()
    {
        dialog_directly_transfer.show(this.playerInfo);
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
