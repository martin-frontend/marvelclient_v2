import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PagePromotionStatisticsProxy from "../../../proxy/PagePromotionStatisticsProxy";
import { amountFormat, dateFormat, getTodayOffset } from "@/core/global/Functions";
import CoinTransformHelper from "@/_skin030/core/CoinTransformHelper";
import ModulesHelper from "@/_skin030/core/ModulesHelper";
import GameConfig from "@/core/config/GameConfig";
import PanelUtil from "@/_skin030/core/PanelUtil";
import { getMoneyColor } from "@/_skin030/core/ColorfullText";

@Component
export default class Fanyong extends AbstractView {
    LangUtil = LangUtil;

    myProxy: PagePromotionStatisticsProxy = this.getProxy(PagePromotionStatisticsProxy);
    tableData = this.myProxy.pageData.tableData;
    pageData = this.myProxy.promotionProxy.pageData;
    promotionProxy = this.myProxy.promotionProxy;
    getMoneyColor = getMoneyColor;
    transformMoney(val: any) {
        return CoinTransformHelper.TransformMoney(val, 2, GameConfig.config.SettlementCurrency, "USDT", true, true, true, false);
        //return this.myProxy.transformMoney(val);
    }

    transformMoney_commission(val: any) {
        const coinMoney = val[CoinTransformHelper.platCoins.mainCoin.name] || 0;

        const sss = coinMoney * CoinTransformHelper.GetMainCoinScale;

        if (!ModulesHelper.RebateDisplayType()) {
            return amountFormat(sss / 100, true) + this.LangUtil("%");
        }
        return amountFormat(sss, true);
    }
    ModulesHelper = ModulesHelper;

    getCommissionNum_totle(val: any) {
        if (!ModulesHelper.RebateListType()) {
            return this.transformMoney(val);
        }
        //计算是多少万
        const res = CoinTransformHelper.TransformMoney(val, 2, GameConfig.config.SettlementCurrency, "USDT", false, false, false, false);
        if (parseFloat(res) > 10000) {
            const aaa = CoinTransformHelper.GetCoinSymbol(GameConfig.config.SettlementCurrency) + amountFormat(res / 10000, true);
            return LangUtil("{0}万", aaa);
        }

        return this.transformMoney(val);
    }

    onQuery() {
        // if (this.pageData.search.agent_user_id == "") {
        //     PanelUtil.message_alert(LangUtil("请输入ID"));
        //     return;
        // }
        PanelUtil.showAppLoading(true);
        // this.myProxy.pageData.loading = true;
        this.promotionProxy.onQuery();
    }

    @Watch("pageData.search.agent_user_id")
    onWatchSearchAgentId(val: any) {
        if (val != "") {
            this.pageData.idButtonActive = true;
        } else {
            this.pageData.idButtonActive = false;
        }
    }

    timeRange: any = ["", ""];
    created() {
        // this.setDatePiker();
        //console.log("    创建 ---  创建");
        const start = getTodayOffset(-6);
        const end = getTodayOffset(1, 1);
        this.timeRange = [start, end];
        this.onTimeChange();
    }
    onTimeChange() {
        let date_1 = "";
        let date_2 = "";
        if (this.timeRange) {
            const startDate: any = this.timeRange[0];
            const endDate: any = this.timeRange[1];
            if (startDate) {
                date_1 = dateFormat(startDate, "yyyy-MM-dd hh:mm:ss");
            }
            if (endDate) {
                date_2 = dateFormat(endDate, "yyyy-MM-dd hh:mm:ss");
            }
        }
        this.pageData.search.dateArr = [date_1, date_2];
        // this.pageData.listQuery.page_count = 1;
        // this.myProxy.api_user_var_credit_statistic();
        this.promotionProxy.onQuery();
    }

    @Watch("pageData.search.dateArr")
    onWatchSearchDate(val: any) {
        if (val != "") {
            this.pageData.dateButtonActive = true;
            // this.promotionProxy.onQuery();
        } else {
            this.pageData.dateButtonActive = false;
        }
    }

    mounted() {
        this.promotionProxy.reset();
        // this.promotionProxy.onQuery();
        // this.start_date = this.pageData.search.dateArr[0];
        // this.endDate = this.pageData.search.dateArr[1];
        // console.log("开始事件", this.start_date);
        // console.log("开始事件", this.endDate);

        // const start = getTodayOffset(-6);
        // const end = getTodayOffset(1, 1);
        // this.timeRange = [start, end];
        // this.onTimeChange();
    }
}
