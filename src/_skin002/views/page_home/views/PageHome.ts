import AbstractView from "@/core/abstract/AbstractView";
import { getVersion } from "@/core/global/Functions";
import getProxy from "@/core/global/getProxy";
import { Watch, Component } from "vue-property-decorator";
import PageHomeMediator from "../mediator/PageHomeMediator";
import PageHomeProxy from "../proxy/PageHomeProxy";

@Component
export default class PageHome extends AbstractView {
    getVersion = getVersion;
    myProxy: PageHomeProxy = getProxy(PageHomeProxy);
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
}
