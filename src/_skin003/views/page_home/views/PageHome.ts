import AbstractView from "@/core/abstract/AbstractView";
import { getVersion } from "@/core/global/Functions";
import { Watch, Component } from "vue-property-decorator";
import PageHomeMediator from "../mediator/PageHomeMediator";
import PageHomeProxy from "../proxy/PageHomeProxy";
import dialog_service from "@/_skin003/views/dialog_service";
import LangUtil from "@/core/global/LangUtil";
@Component
export default class PageHome extends AbstractView {
    getVersion = getVersion;
    LangUtil = LangUtil;
    myProxy: PageHomeProxy = this.getProxy(PageHomeProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(PageHomeMediator);
    }

    getChannelID() {
        return core.channel_id;
    }

    destroyed(){
        super.destroyed();
    }
    goService_2(tag:number) {
        if (tag == 1)
        {
            dialog_service.show(LangUtil("AML政策标题") , LangUtil("AML政策内容"));
        }
        else if (tag == 2)
        {
            dialog_service.show(LangUtil("隐私政策标题") , LangUtil("隐私政策内容"));
        }
        else if (tag == 3)
        {
            dialog_service.show(LangUtil("负责任的赌博标题") , LangUtil("负责任的赌博内容"));
        }
        else if (tag == 4)
        {
            dialog_service.show(LangUtil("条款和条件标题") , LangUtil("条款和条件内容"));
        }
    }
}
