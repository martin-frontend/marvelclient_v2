import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogStatisticsCreditMediator from "../mediator/DialogStatisticsCreditMediator";
import DialogStatisticsCreditProxy from "../proxy/DialogStatisticsCreditProxy";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/assets/Assets";
import { dateFormat, getTodayOffset } from "@/core/global/Functions";
import dialog_bet_record from "@/_skin001/views/dialog_bet_record";

@Component
export default class DialogStatisticsCredit extends AbstractView {
    LangUtil = LangUtil;
    commonIcon = Assets.commonIcon;
    myProxy: DialogStatisticsCreditProxy = this.getProxy(DialogStatisticsCreditProxy);
    pageData = this.myProxy.pageData;

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
        super(DialogStatisticsCreditMediator);
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
        this.myProxy.api_user_var_credit_statistic();
    }

    onQuery() {
        this.myProxy.api_user_var_credit_statistic();
    }

    onPageChange(val: any) {
        this.pageData.listQuery.page_count = val;
        this.myProxy.api_user_var_credit_statistic();
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            const start = getTodayOffset(-6);
            const end = getTodayOffset(1, 1);
            this.timeRange = [start, end];
            this.onTimeChange();
        }
    }

    onUserIdClick(user_id:number){
        const listQuery = this.pageData.listQuery;
        dialog_bet_record.show(user_id, listQuery.start_date, listQuery.end_date, false);
    }

    getMoneyColor(str:string):string{
        return (!!str && str.search('-') == -1) ? "colorGreen--text" : "red--text";
    }
    getMoneyValue(str:string):string{
        if(!!str && str.search('-') == -1) return "+" + str;
        return str;
    }
}
