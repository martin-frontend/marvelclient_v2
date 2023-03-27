import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogActivityDetailMediator from "../mediator/DialogActivityDetailMediator";
import DialogActivityDetailProxy from "../proxy/DialogActivityDetailProxy";
import router from "@/router";
import LangUtil from "@/core/global/LangUtil";
@Component
export default class DialogActivityDetail extends AbstractView {
    myProxy: DialogActivityDetailProxy = this.getProxy(DialogActivityDetailProxy);
    pageData = this.myProxy.pageData;
    LangUtil = LangUtil;
    constructor() {
        super(DialogActivityDetailMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (!this.pageData.bShow) {
            //@ts-ignore
            window["vm"].$router.push("/page_activity");
        }
    }
}
