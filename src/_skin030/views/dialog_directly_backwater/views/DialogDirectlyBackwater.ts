import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";

import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyBackwaterMediator from "../mediator/DialogDirectlyBackwaterMediator";
import DialogDirectlyBackwaterProxy from "../proxy/DialogDirectlyBackwaterProxy";
import LangUtil from "@/core/global/LangUtil";
import Constant from "@/core/global/Constant";
import MultDialogManager from "@/_skin030/core/MultDialogManager";

@Component
export default class DialogDirectlyBackwater extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlyBackwaterProxy = this.getProxy(DialogDirectlyBackwaterProxy);
    pageData = this.myProxy.pageData;
    playerInfo = this.myProxy.playerInfo;
    formData = this.myProxy.formData;

    constructor() {
        super(DialogDirectlyBackwaterMediator);
    }
    //是否为我的反水
    public get isMineWater(): boolean {
        //return true;
        return this.pageData.bisMine;
    }
    public get isDisable(): boolean {
        const coinKeys = Object.keys(this.myProxy.inputWaterData);

        for (let index = 0; index < coinKeys.length; index++) {
            const element = coinKeys[index];
            if (this.myProxy.playerInfo.water_config[element] != parseFloat(this.myProxy.inputWaterData[element])) {
                return false;
            }
        }

        return true;
    }
    getConfigName(type: any) {
        return Constant.GameTypeText(type);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }
    onClickSure() {
        this.myProxy.api_user_var_agent_direct_user_update();
        this.onClose();
    }
    onUsernameBlur() {}
    onAreaCodeInput(item: any) {
        console.log("调用,item", item);
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
        }
        PageBlur.blur_page(this.pageData.bShow);
    }
}
