import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { dateFormat, getTodayOffset } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import dialog_order from "@/_skin001/views/dialog_order";
import { Watch, Component } from "vue-property-decorator";
import DialogBetRecordMediator from "../mediator/DialogBetRecordMediator";
import DialogBetRecordProxy from "../proxy/DialogBetRecordProxy";

@Component
export default class DialogBetRecord extends AbstractView {
    LangUtil = LangUtil;
    commonIcon = Assets.commonIcon;
    myProxy: DialogBetRecordProxy = this.getProxy(DialogBetRecordProxy);
    pageData = this.myProxy.pageData;
    listOptions = this.myProxy.listOptions;
    listQuery = this.pageData.listQuery;

    constructor() {
        super(DialogBetRecordMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.listOptions.typeSelect = this.listOptions.vendorSelect = this.listOptions.statusSelect = this.listOptions.timeSelect = this.listOptions.betTimeSelect = 0;
            this.myProxy.resetQuery();
            this.myProxy.getApi();
        }
    }
    @Watch("$vuetify.breakpoint.xsOnly")
    onWatchXS() {
        if (this.pageData.bShow) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.getApi();
        }
    }
    @Watch("pageData.search.dateArr")
    onWatchSearchDate(val: any) {
        if (val != "") {
            this.pageData.dateButtonActive = true;
        } else {
            this.pageData.dateButtonActive = false;
        }
    }

    onQuery() {
        this.myProxy.getApi();
    }

    onTypeChange() {
        this.listQuery.vendor_type = this.listOptions.typeSelect;
        this.listQuery.page_count = 1;
        this.myProxy.pageData.list = [];
        this.listQuery.page_count = 1;
        this.myProxy.getApi();
    }
    onVendorChange() {
        this.listQuery.vendor_id = this.listOptions.vendorSelect;
        this.listQuery.page_count = 1;
        this.myProxy.pageData.list = [];
        this.listQuery.page_count = 1;
        this.myProxy.getApi();
    }
    onStatusChange() {
        this.listQuery.settlement_status = this.listOptions.statusSelect;
        this.listQuery.page_count = 1;
        this.myProxy.pageData.list = [];
        this.listQuery.page_count = 1;
        this.myProxy.getApi();
    }
    // onTimeChange() {
    //     this.myProxy.pageData.list = [];
    //     this.listQuery.page_count = 1;
    //     switch (this.listOptions.timeSelect) {
    //         case 0:
    //             this.listQuery.start_date = dateFormat(getTodayOffset(), "yyyy-MM-dd");
    //             this.listQuery.end_date = dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd");
    //             break;
    //         case 1:
    //             this.listQuery.start_date = dateFormat(getTodayOffset(-1), "yyyy-MM-dd");
    //             this.listQuery.end_date = dateFormat(getTodayOffset(0, 1), "yyyy-MM-dd");
    //             break;
    //         case 2:
    //             this.listQuery.start_date = dateFormat(getTodayOffset(-6), "yyyy-MM-dd");
    //             this.listQuery.end_date = dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd");
    //             break;
    //         case 3:
    //             this.listQuery.start_date = dateFormat(getTodayOffset(-29), "yyyy-MM-dd");
    //             this.listQuery.end_date = dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd");
    //             break;
    //     }
    //     this.listQuery.page_count = 1;
    //     this.myProxy.pageData.list = [];
    //     this.myProxy.getApi();
    // }
    onBetTimeChange() {
        this.myProxy.pageData.list = [];
        this.listQuery.page_count = 1;
        let order_by = {};
        if (this.listOptions.betTimeSelect == 0) {
            order_by = {
                "bet_at": "DESC",
            };
        } else {
            order_by = {
                "settlement_at": "DESC",
            };
        }
        this.listQuery.order_by = JSON.stringify(order_by);
        this.myProxy.getApi();
    }


    onPageChange(val: any) {
        this.listQuery.page_count = val;
        this.myProxy.getApi();
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }

    handlerDetail(game_info: string) {
        dialog_order.show(game_info);
    }
}
