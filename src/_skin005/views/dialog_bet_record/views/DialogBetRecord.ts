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

@Component
export default class DialogBetRecord extends AbstractView {
    LangUtil = LangUtil;

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
            return CoinTransformHelper.TransformMoney(
                val,
                2,
                this.listQuery.coin_name_unique,
                this.listQuery.coin_name_unique,
                true,
                true,
                ismoney
            );
        } else {
            //这个是美元的金额，需要 转换为 设置的结算 币种的金额 然后添加货币符号 和格式化

            val = item[key] || 0;

            return CoinTransformHelper.TransformMoney(val, 2, GameConfig.config.SettlementCurrency, "USDT", true, true, ismoney);
        }
    }
    transformMoney_backwater(val: any) {
        return CoinTransformHelper.TransformMoney(
            val,
            2,
            this.listQuery.coin_name_unique,
            this.listQuery.coin_name_unique,
            true,
            true,
            false
        );
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
    @Watch("pageData.bShowOptions")
    watchShowOptions() {
        console.log("-----创建 ----");
        if (this.pageData.bShowOptions) {
            const keyNode = document.querySelector(".el-date-editor");
            if (!keyNode) return;
            console.log("-----创建 --22222--");
            //for (let index = 0; index < keyNode.length; index++) {
            const element = keyNode;

            const iNode = document.createElement("i");
            iNode.setAttribute("class", "el-icon-date"); // el-icon-bottom
            element.appendChild(iNode);

            iNode.style.position = "absolute";
            iNode.style.top = "13px";
            iNode.style.right = "12px";
            iNode.style.color = "#f00";
            iNode.style.pointerEvents = "none";
        }
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

    public get isOtherUser(): any {
        if (!this.groupsTitle) {
            //return this.curShowId;
            return "";
        } else {
            return this.listQuery.agent_user_id + "(" + this.groupsTitle + ")";
        }
    }

    public get showMultUserList(): any {
        if (!this.pageData.bShowFilterBtn) {
            return [];
        }
        return this.myProxy.pageData.filterBtnInfo.parents;
    }

    onBtnClickUserInfo(item: any) {
        //console.log("收到点击" , item);
        this.myProxy.refrushFilter({ user_id: item });
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
        //console.log("---this.listOptions.moneySelect---",this.listOptions.moneySelect)
        if (<any>this.listOptions.moneySelect != 0) {
            return true;
        }
        //console.log("全部币种----");
        return false;
    }

    public get groupsTitle(): string {
        if (this.pageData.filterBtnInfo && this.pageData.filterBtnInfo.is_group == 2) {
            return LangUtil("团队");
        } else {
            return "";
        }
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
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.listOptions.typeSelect = this.listOptions.vendorSelect = this.listOptions.statusSelect = this.listOptions.timeSelect = 0;
            //this.listOptions.moneySelect = 0;
            //this.myProxy.resetQuery();

            const start_date = this.pageData.listQuery.start_date ? this.pageData.listQuery.start_date : getTodayOffset();
            const end_date = this.pageData.listQuery.end_date ? this.pageData.listQuery.end_date : getTodayOffset(1, 1);
            this.timeRange = [start_date, end_date];
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

    handlerDetail(data: string) {
        //dialog_order.show(data);
        PanelUtil.openpanel_order(data);
    }
    //筛选按钮点击
    onFilterBtnClick() {
        //console.log("打开筛选 页面");
        PanelUtil.openpanel_bet_filter();
    }
    getDate(str: string) {
        return changeDateShow(str);
    }
}
