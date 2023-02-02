import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogServiceMediator from "../mediator/DialogServiceMediator";
import DialogServiceProxy from "../proxy/DialogServiceProxy";

@Component
export default class DialogService extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogServiceProxy = this.getProxy(DialogServiceProxy);
    pageData = this.myProxy.pageData;
    
    constructor() {
        super(DialogServiceMediator);
    }

    onClose() {
        //this.myProxy.resetdata();
        this.pageData.bShow = false;
    }

    
    public get text_title() : string {
        if (this.myProxy.customData.title)
        {
            return this.myProxy.customData.title;
        }
        else
            return LangUtil("服务条款");
    }
    
    public get text_neirong() : string {
        if (this.myProxy.customData.neirong)
        {
            return this.myProxy.customData.neirong;
        }
        else
            return LangUtil("服务条款内容");
    }
    
    
    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}
