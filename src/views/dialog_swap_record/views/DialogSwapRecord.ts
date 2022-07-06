import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogSwapRecordMediator from "../mediator/DialogSwapRecordMediator";
import DialogSwapRecordProxy from "../proxy/DialogSwapRecordProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogSwapRecord extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogSwapRecordProxy = this.getProxy(DialogSwapRecordProxy);
    pageData = this.myProxy.pageData;
    listOptions = this.myProxy.listOptions;

    constructor() {
        super(DialogSwapRecordMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_swap_order_list();
        }
    }

    @Watch("$vuetify.breakpoint.xsOnly")
    onWatchXS() {
        if (this.pageData.bShow) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.api_user_var_swap_order_list();
        }
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }
}
