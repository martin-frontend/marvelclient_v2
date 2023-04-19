import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyAgentsetMediator from "../mediator/DialogDirectlyAgentsetMediator";
import DialogDirectlyAgentsetProxy from "../proxy/DialogDirectlyAgentsetProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogDirectlyAgentset extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlyAgentsetProxy = this.getProxy(DialogDirectlyAgentsetProxy);
    pageData = this.myProxy.pageData;
    formData = this.myProxy.formData;
    playerInfo = this.myProxy.playerInfo;

    constructor() {
        super(DialogDirectlyAgentsetMediator);
    }

    public get isDisable(): boolean {
        if (!this.formData.inputrate) {
            return true;
        }
        const res = parseFloat(this.formData.inputrate);
        //console.log("当前输入值" ,res)
        if (res < 0) return true;

        console.log(typeof res, typeof this.playerInfo.parent_credit_rate);
        if (res > parseFloat(this.playerInfo.parent_credit_rate)) {
            //console.log("比自己的 大" ,this.playerInfo.parent_credit_rate)
            return true;
        }
        return false;
    }

    onClickSure() {
        //const res = ((this.formData.inputrate *100)>>0) / 10000
        const res = this.formData.inputrate;
        this.myProxy.agent_direct_user_update(<any>res);
    }
    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
        }
    }
}
