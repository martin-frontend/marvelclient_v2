import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyBackwaterMediator from "../mediator/DialogDirectlyBackwaterMediator";
import DialogDirectlyBackwaterProxy from "../proxy/DialogDirectlyBackwaterProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogDirectlyBackwater extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlyBackwaterProxy = this.getProxy(DialogDirectlyBackwaterProxy);
    pageData = this.myProxy.pageData;
    playerInfo =  this.myProxy.playerInfo;
    formData = this.myProxy.formData;

    constructor() {
        super(DialogDirectlyBackwaterMediator);
    }
    //是否为我的反水
    public get isMineWater() : boolean {
        //return true;
        return this.pageData.bisMine;
    }
    public get isDisable() : boolean {
        
        const coinKeys = Object.keys(this.myProxy.inputWaterData);

        for (let index = 0; index < coinKeys.length; index++) {
            const element = coinKeys[index];
            if (this.myProxy.playerInfo.water_config[element] != parseFloat(this.myProxy.inputWaterData[element]) )
            {
                return false
            }
        }

        return true
    }
    getConfigName(type:any)
    {
        let str = "";
        switch (type) {
            case "2":str ="棋牌"
                break;
            case "4":str ="彩票"
                break;
            case "8":str ="捕鱼"
                break;
            case "16":str ="电子"
                break;
            case "32":str ="真人"
                break;
            case "64":str ="体育电竞"
                break;
            case "128":str ="链游"
                break;
            default:
                str = type;
                break;
        }
        return LangUtil(str)
    }

    onClose() {
        this.pageData.bShow = false;
    }
    onClickSure()
    {
        this.myProxy.api_user_var_agent_direct_user_update();
        this.onClose();
    }
    onUsernameBlur()
    {
        
    }
    onAreaCodeInput(item:any)
    {
        console.log("调用,item",item)
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
        }
        BlurUtil(this.pageData.bShow);
    }
}
