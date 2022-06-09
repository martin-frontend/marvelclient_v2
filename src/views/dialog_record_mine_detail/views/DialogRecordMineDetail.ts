import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogRecordMineDetailMediator from "../mediator/DialogRecordMineDetailMediator";
import DialogRecordMineDetailProxy from "../proxy/DialogRecordMineDetailProxy";

@Component
export default class DialogRecordMineDetail extends AbstractView {
    myProxy: DialogRecordMineDetailProxy = this.getProxy(DialogRecordMineDetailProxy);
    pageData = this.myProxy.pageData;
    typeOptions = this.myProxy.typeOptions;
    LangUtil = LangUtil;

    constructor() {
        super(DialogRecordMineDetailMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
        }
    }

    /**分页 */
    onPageChange(val: any) {
        console.log("分页 >>", val);
        // this.listQuery.page_count = val;
        // this.myProxy.api_user_var_mail();
    }
}
