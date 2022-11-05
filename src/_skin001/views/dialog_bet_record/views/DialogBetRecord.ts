import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import GameConfig from "@/core/config/GameConfig";
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
    GameConfig = GameConfig;
    commonIcon = Assets.commonIcon;
    myProxy: DialogBetRecordProxy = this.getProxy(DialogBetRecordProxy);
    pageData = this.myProxy.pageData;
    listOptions = this.myProxy.listOptions;
    listQuery = this.pageData.listQuery;
    pageInfo = this.myProxy.pageData.pageInfo;

    timeRange: any = ["", ""];
    pickerOptions = {
        shortcuts: [
            {
                text: LangUtil("最近一周"),
                onClick(picker: any) {
                    const start = getTodayOffset(-6);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近一个月"),
                onClick(picker: any) {
                    const start = getTodayOffset(-30);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
        ],
    };

    constructor() {
        super(DialogBetRecordMediator);
    }

    onTimeChange() {
        if (this.timeRange) {
            const startDate: any = this.timeRange[0];
            const endDate: any = this.timeRange[1];
            if (startDate) {
                this.pageData.listQuery.start_date = dateFormat(startDate, "yyyy-MM-dd hh:mm:ss");
            } else {
                this.pageData.listQuery.start_date = "";
            }
            if (endDate) {
                this.pageData.listQuery.end_date = dateFormat(endDate, "yyyy-MM-dd hh:mm:ss");
            } else {
                this.pageData.listQuery.end_date = "";
            }
        } else {
            this.pageData.listQuery.start_date = "";
            this.pageData.listQuery.end_date = "";
        }

        this.pageData.listQuery.page_count = 1;
        this.myProxy.getApi();
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
            if(this.pageData.listQuery.start_date){
                this.timeRange[0] = new Date(this.pageData.listQuery.start_date);
            }else{
                this.timeRange[0] = getTodayOffset();
            }
            if(this.pageData.listQuery.end_date){
                this.timeRange[1] = new Date(this.pageData.listQuery.end_date);
            }else{
                this.timeRange[1] = getTodayOffset(1, 1);
            }
            this.onTimeChange();
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
