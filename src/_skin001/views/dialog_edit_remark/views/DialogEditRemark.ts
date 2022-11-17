import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogEditRemarkMediator from "../mediator/DialogEditRemarkMediator";
import DialogEditRemarkProxy from "../proxy/DialogEditRemarkProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogEditRemark extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogEditRemarkProxy = this.getProxy(DialogEditRemarkProxy);
    pageData = this.myProxy.pageData;

    inputData = "";
    get isCheckedId():boolean
    {
        if (this.inputData && this.inputData != this.myProxy.playerInfo.remark)
            return true;
        return false;
    }
       
    
    constructor() {
        super(DialogEditRemarkMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    onClickSure()
    {
        //console.log("确定提交--->>>" ,this.inputData);
        this.myProxy.agent_direct_user_update( this.inputData);
    }
    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            this.inputData =  this.myProxy.playerInfo.remark;
            //this.myProxy.api_xxx();
        }
        else{
            this.inputData="";
        }
    }
}
