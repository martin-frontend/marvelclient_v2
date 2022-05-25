import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogRecordMineMediator from "../mediator/DialogRecordMineMediator";
import DialogRecordMineProxy from "../proxy/DialogRecordMineProxy";
import dialog_record_mine_detail from "@/views/dialog_record_mine_detail";
import Assets from "@/assets/Assets";

@Component
export default class DialogRecordMine extends AbstractView {
    myProxy: DialogRecordMineProxy = this.getProxy(DialogRecordMineProxy);
    pageData = this.myProxy.pageData;

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogRecordMineMediator);
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
            this.myProxy.api_user_var_backwater();
        }
    }

    handlerDetail(item: any) {
        this.myProxy.api_user_var_backwater_var(item.backwater_id);
    }
    /**分页 */
    onPageChange(val: any) {
        console.log("分页 >>", val);
        // this.listQuery.page_count = val;
        // this.myProxy.api_user_var_mail();
    }
}
