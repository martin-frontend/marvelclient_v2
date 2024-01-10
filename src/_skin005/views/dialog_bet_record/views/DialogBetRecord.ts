import AbstractView from "@/core/abstract/AbstractView";
import GameConfig from "@/core/config/GameConfig";
import PageBlur from "@/_skin005/core/PageBlur";
import { changeDateShow, dateFormat, getTodayOffset } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";

import { Watch, Component } from "vue-property-decorator";
import DialogBetRecordMediator from "../mediator/DialogBetRecordMediator";
import DialogBetRecordProxy from "../proxy/DialogBetRecordProxy";

import CopyUtil from "@/core/global/CopyUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import { getMoneyColor, getMoneyValue } from "@/_skin005/core/ColorfullText";
import { scrollUtil_div } from "@/core/global/ScrollUtil";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import Assets from "@/_skin005/assets/Assets";
import exportOrder from "@/core/global/OrderTitleUtils";
import GlobalVar from "@/core/global/GlobalVar";
import DialogClean from "@/_skin005/core/DialogClean";

@Component
export default class DialogBetRecord extends AbstractView {
    GlobalVar = GlobalVar;
    LangUtil = LangUtil;

    getOrderTitle = exportOrder.getOrderTitle;
    GameConfig = GameConfig;
    CategoryIcon = Assets.CategoryIcon;
    commonIcon = Assets.commonIcon;
    getMoneyColor = getMoneyColor;
    getMoneyValue = getMoneyValue;
    myProxy: DialogBetRecordProxy = this.getProxy(DialogBetRecordProxy);
    pageData = this.myProxy.pageData;
    listOptions = this.myProxy.listOptions;
    listQuery = this.pageData.listQuery;
    pageInfo = this.myProxy.pageData.pageInfo;
    selfProxy = PanelUtil.getProxy_selfproxy;
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

    /**表格里面的基础数据 */
    formBaseData = [
        {
            id: 1,
            title: "订单号",
            width: 150,
            data_type: 0,
            config_key: "",
            value_key: "order_no",
        },
        {
            id: 2,
            title: "游戏名称",
            width: 150,
            data_type: 0,
            config_key: "",
            value_key: "vendor_product_name",
        },
        {
            id: 3,
            title: "投注金额",
            width: 120,
            data_type: 0,
            config_key: "",
            value_key: "bet_gold",
        },
        {
            id: 4,
            title: "游戏输赢",
            width: 120,
            data_type: 1,
            config_key: "",
            value_key: "win_gold",
        },
        {
            id: 5,
            title: "有效投注",
            width: 120,
            data_type: 0,
            config_key: "",
            value_key: "valid_bet_gold",
        },
        {
            id: 6,
            title: "结算流水",
            width: 120,
            data_type: 0,
            config_key: "",
            value_key: "water",
        },

        {
            id: 7,
            title: "下注状态",
            width: 140,
            data_type: 0,
            config_key: "",
            value_key: "settlement_status",
        },
        {
            id: 8,
            title: "投注时间",
            width: 100,
            data_type: 0,
            config_key: "",
            value_key: "bet_at",
        },
        {
            id: 9,
            title: "结算时间",
            width: 100,
            data_type: 0,
            config_key: "",
            value_key: "settlement_at",
        },
    ];
    isBrazilExchangeNoStatus(item: any) {
        return item.vendor_id == GameConfig.config.ExchangeVendorId && !item.game_info.state;
    }

    transformMoney(item: any, key: string, ismoney: boolean = false, donotTrans: boolean = false) {
        let val; //
        if (donotTrans) {
            val = item[key + "_coin"] || 0;
            return CoinTransformHelper.TransformMoney(val, 2, item.coin_name_unique, item.coin_name_unique, true, true, ismoney);
        }
        //先判断需要取哪个值来使用
        // 带有 coin 的值 为 对应的币种的金额  不带的  为美元金额
        if (this.is_send_coin || donotTrans) {
            //如果带有 coin 的值 则 只需要对应的 添加 货币符号 然后格式化 就可以了
            val = item[key + "_coin"] || 0;
            return CoinTransformHelper.TransformMoney(val, 2, this.listQuery.coin_name_unique, this.listQuery.coin_name_unique, true, true, ismoney);
        } else {
            //这个是美元的金额，需要 转换为 设置的结算 币种的金额 然后添加货币符号 和格式化

            val = item[key] || 0;

            return CoinTransformHelper.TransformMoney(val, 2, GameConfig.config.SettlementCurrency, "USDT", true, true, ismoney);
        }
    }
    transformMoney_backwater(val: any) {
        return CoinTransformHelper.TransformMoney(val, 2, this.listQuery.coin_name_unique, this.listQuery.coin_name_unique, true, true, false);
    }
    mounted() {
        setTimeout(() => {
            this.setDatePiker();
        }, 400);
        this.myProxy.api_vendor_simple();
    }
    get pageInfoText() {
        const text = LangUtil("共计{0}条", this.pageInfo.pageTotal);
        const regex = /(\d+)/;
        const parts = text.split(regex);
        return parts;
    }

    setDatePiker() {
        const keyNode = document.querySelectorAll(".el-date-editor");
        if (!keyNode) return;
        for (let index = 0; index < keyNode.length; index++) {
            const element = keyNode[index];

            const iNode = document.createElement("i");
            iNode.setAttribute("class", "el-icon-date"); // el-icon-bottom
            element.appendChild(iNode);

            iNode.style.position = "absolute";
            iNode.style.top = "12px";
            iNode.style.right = "12px";
            iNode.style.color = "#8E8F91";
            iNode.style.pointerEvents = "none";
        }
    }

    public get isShowMyWater(): boolean {
        //return false;
        if (this.selfProxy.userInfo.is_credit_user == 1 && this.is_send_coin) return true;
        return false;
    }

    getBackWater(nub: any) {
        if (typeof nub == "string") {
            nub = parseFloat(nub);
        }
        nub = nub * 0.01;

        return this.transformMoney_backwater(nub);
    }
    public get is_send_coin(): boolean {
        if (<any>this.listOptions.moneySelect != 0) {
            return true;
        }
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
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        DialogClean();
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.listOptions.typeSelect = this.listOptions.vendorSelect = this.listOptions.statusSelect = this.listOptions.timeSelect = 0;
            this.listOptions.typeSelect = this.listQuery.vendor_type = parseInt(Object.keys(this.listOptions.typeOptions())[0]);
            //this.listOptions.moneySelect = 0;
            //this.myProxy.resetQuery();

            const start_date = this.pageData.listQuery.start_date ? this.pageData.listQuery.start_date : getTodayOffset();
            const end_date = this.pageData.listQuery.end_date ? this.pageData.listQuery.end_date : getTodayOffset(1, 1);
            this.timeRange = [start_date, end_date];

            // this.pageData.listQuery.start_date = this.pageData.listQuery.start_date || getTodayOffset();
            // this.pageData.listQuery.end_date = this.pageData.listQuery.end_date || getTodayOffset(1, 1);
            // this.timeRange = [this.pageData.listQuery.start_date, this.pageData.listQuery.end_date];
            this.onTimeChange();
        } else {
            this.myProxy.clearFilterInfo();
            this.myProxy.resetQuery();
        }
    }
    @Watch("$mobile")
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
                bet_at: "DESC",
            };
        } else {
            order_by = {
                settlement_at: "DESC",
            };
        }
        this.listQuery.order_by = JSON.stringify(order_by);
        this.myProxy.getApi();
    }

    onPageChange(val: any) {
        this.listQuery.page_count = val;
        this.myProxy.getApi();
        if (this.$refs.scrollObj) {
            //@ts-ignore
            scrollUtil_div(this.$refs.scrollObj.$el, 0);
        }
    }

    onRefresh(done: any) {
        //console.log(">>>>>>>>.onRefresh")
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        //console.log(">>>>>>>>.onLoad")
        this.myProxy.listMore(done);
    }

    onCopyOrderClick(order: any) {
        CopyUtil(order + "");
        PanelUtil.message_info(LangUtil("复制成功"));
    }

    //筛选按钮点击
    onFilterBtnClick() {
        //console.log("打开筛选 页面");
        PanelUtil.openpanel_bet_filter();
    }
    getDate(str: string, isChange: boolean = true) {
        return changeDateShow(str, isChange);
    }
    /**返回游戏名 */
    getVendorProductName(item: any): any {
        if (item.is_multi) {
            return item.vendor_name;
        }

        if (item.vendor_id == GameConfig.config.FBVendorId) {
            return item.tournament_name;
        }

        return item.game_info.cpn || item.vendor_product_name;
    }
}
