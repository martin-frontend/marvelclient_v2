import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogRecordMineDetailMediator from "../mediator/DialogRecordMineDetailMediator";
import DialogRecordMineDetailProxy from "../proxy/DialogRecordMineDetailProxy";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

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
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
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
