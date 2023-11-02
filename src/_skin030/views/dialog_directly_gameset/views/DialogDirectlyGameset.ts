import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyGamesetMediator from "../mediator/DialogDirectlyGamesetMediator";
import DialogDirectlyGamesetProxy from "../proxy/DialogDirectlyGamesetProxy";
import LangUtil from "@/core/global/LangUtil";
import Constant from "@/core/global/Constant";
import MultDialogManager from "@/_skin030/core/MultDialogManager";

@Component
export default class DialogDirectlyGameset extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlyGamesetProxy = this.getProxy(DialogDirectlyGamesetProxy);
    pageData = this.myProxy.pageData;
    playerInfo = this.myProxy.playerInfo;
    constructor() {
        super(DialogDirectlyGamesetMediator);
    }
    public get isDisable(): boolean {
        const coinKeys = Object.keys(this.myProxy.inputData);

        for (let index = 0; index < coinKeys.length; index++) {
            const element = coinKeys[index];
            if (this.myProxy.playerInfo.vendor_type_switch[element] != parseInt(this.myProxy.inputData[element])) {
                return false;
            }
        }

        return true;
    }
    handlerUpdate(val: any) {}
    getConfigName(type: any) {
        return Constant.GameTypeText(type);
    }
    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }
    //游戏开关对象
    public get gameSwitchInfo(): any {
        return this.myProxy.playerInfo.vendor_type_switch;
    }
    onClickSure() {
        this.myProxy.api_user_var_agent_direct_user_update();
        this.onClose();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            //this.myProxy.api_xxx();
        }
    }
}
