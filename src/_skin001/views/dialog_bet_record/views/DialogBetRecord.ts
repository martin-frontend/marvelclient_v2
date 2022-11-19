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
import SelfProxy from "@/proxy/SelfProxy";

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
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
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


    public get isOtherUser(): any {
        return this.listQuery.agent_user_id
    }
    
    public get isShowMyWater() : boolean {
        return false;
        if (this.selfProxy.userInfo.is_credit_user == 1 && this.is_send_coin == false)
            return true;
        return false;
    }
    

    public get is_send_coin(): boolean {
        //console.log("---this.listOptions.moneySelect---",this.listOptions.moneySelect)
        if (<any>this.listOptions.moneySelect != 0) {
            return true;
        }
        //console.log("全部币种----");
        return false;
    }

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
            this.listOptions.typeSelect = this.listOptions.vendorSelect = this.listOptions.statusSelect = this.listOptions.timeSelect = 0;
            //this.listOptions.moneySelect = 0; 
            this.myProxy.resetQuery();

            const start_date = this.pageData.listQuery.start_date ? this.pageData.listQuery.start_date : getTodayOffset();
            const end_date = this.pageData.listQuery.end_date ? this.pageData.listQuery.end_date : getTodayOffset(1, 1);
            this.timeRange = [start_date, end_date]
            this.onTimeChange();
        }
    }
    @Watch("$vuetify.breakpoint.mobile")
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

    onMoneyTypeChange() {
        this.listQuery.coin_name_unique = <any>this.listOptions.moneySelect;
        if (this.listQuery.coin_name_unique == "0") {
            this.listQuery.coin_name_unique = "";
        }

        this.listQuery.page_count = 1;
        this.myProxy.pageData.list = [];
        this.listQuery.page_count = 1;
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
        //console.log(">>>>>>>>.onRefresh")
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        //console.log(">>>>>>>>.onLoad")
        this.myProxy.listMore(done);
    }

    handlerDetail(game_info: string) {
        dialog_order.show(game_info);
    }
    getMoneyColor(str: string): string {
        const newstr = str.replace("$", "");
        const amount = Number(newstr);
        if (amount == 0) {
            return ""
        }
        return (!!str && str.search('-') == -1) ? "colorGreen--text" : "red--text";
    }
    getMoneyValue(str: string): string {

        const newstr = str.replace("$", "");
        const amount = Number(newstr);
        if (amount == 0) {
            return str
        }
        if (!!str && str.search('-') == -1) return "+" + str;
        return str;
    }
}
