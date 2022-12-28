import Constant from "@/core/global/Constant";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import Vue from "vue";
import GameProxy from "@/proxy/GameProxy";
import getProxy from "@/core/global/getProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";


export default class DialogBetRecordProxy extends puremvc.Proxy {
    static NAME = "DialogBetRecordProxy";
    gameProxy: GameProxy = getProxy(GameProxy);
    GamePlatConfig = GamePlatConfig;
    public onRegister(): void {
        this.api_vendor_simple();

    }

    pageData = {
        loading: false,
        bShow: false,
        bShowOptions: true, //是否显示选取框
        bShowMoneyType: false, //是否显示 结算币种
        bShowUserId: false,  //是否显示玩家id
        bShowTimeText: false,//是否显示 时间文字
        bShowIsMine: false,
        bShowFilterBtn: false,// 是否显示筛选按钮
        filterBtnInfo: <any>{}, //筛选按钮需要用到的信息
        // 列表是否加载完成，手机模式专用
        finished: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            vendor_type: <any>null,
            vendor_id: <any>null,
            settlement_status: <any>null,
            coin_name_unique: "",  //币种
            start_date: "",
            end_date: "",
            page_count: 1,
            page_size: 20,
            agent_user_id: null,
            order_by: <any>null,
            is_group: 1,
        },
        list: <any>[],
        dateButtonActive: false,
        search: {
            dateArr: <any>[],
        },
        total_bet_gold: "",
        total_water: "",
        total_valid_bet_gold: "",
        total_win_gold: "",
        total_bet_gold_coin: "",
        total_water_coin: "",
        total_valid_bet_gold_coin: "",
        total_win_gold_coin: "",
        total_backwater_coin: "",
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        vendors: <any>[],
        //加载完毕后调用，手机模式专用
        done: <any>null,
    };
    //选择器
    listOptions = {
        typeSelect: 0,
        vendorSelect: 0,
        statusSelect: 0,
        timeSelect: 0,
        betTimeSelect: 0,
        moneySelect: 0,
        typeOptions: () => {
            return {
                0: LangUtil("全部类型"),
                2: LangUtil("棋牌"),
                4: LangUtil("彩票"),
                8: LangUtil("捕鱼"),
                16: LangUtil("电子"),
                32: LangUtil("真人"),
                64: LangUtil("体育"),
                128: LangUtil("电竞"),
            };
        },
        vendorOptions: () => {
            const options: any = { 0: LangUtil("全部厂商") };
            for (const item of this.pageData.vendors) {
                options[item.vendor_id] = item.vendor_name;
            }
            return options;
        },
        statusOptions: () => {
            return {
                0: LangUtil("全部状态"),
                1: LangUtil("未结算"),
                11: LangUtil("已结算"),
                2: LangUtil("已取消"),
            };
        },
        betTimeOptions: () => {
            return {
                0: LangUtil("投注时间"),
                1: LangUtil("结算时间"),
            };
        },
        timeOptions: () => {
            return Constant.TIME_TYPE;
        },
        moneyOptions: () => {
            const moneyKeys = Object.keys(GamePlatConfig.config.plat_coins);
            const options: any = { 0: LangUtil("全部币种") };
            for (let index = 0; index < moneyKeys.length; index++) {
                options[moneyKeys[index]] = moneyKeys[index];
            }
            return options;
        }

    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            vendor_type: null,
            vendor_id: null,
            //coin_name_unique:"",  //币种
            settlement_status: null,
            page_count: 1,
            page_size: 20,
            is_group: 1,
        });

    }
    clearFilterInfo() {
        this.pageData.filterBtnInfo = {};
    }
    //设置筛选信息
    setFilterInfo(data: any) {
        this.pageData.bShowFilterBtn = true;
        Object.assign(this.pageData.filterBtnInfo, data);
        this.pageData.filterBtnInfo = JSON.parse(JSON.stringify(data));
        //console.log("传入的代理链的值为", this.pageData.filterBtnInfo);
    }
    setVendors(data: any) {
        this.pageData.vendors = data;
    }
    initShowType() {
        this.pageData.bShowOptions = true;
        this.pageData.bShowMoneyType = false;
        this.pageData.bShowTimeText = false;
        this.pageData.bShowUserId = false;
        this.pageData.bShowIsMine = false;
        this.pageData.bShowFilterBtn = false;
    }
    setTestData()
    {
        const obj={
            order_no:"234sfdsda", 
            vendor_product_name:"234sfdsda", 
            coin_name_unique:"234sfdsda", 
            bet_gold_coin:23423, 
            bet_gold:23423, 
            valid_bet_gold_coin:23423, 
            valid_bet_gold:23423, 
            water_coin:23423, 
            water:23423, 
            settlement_status:23423, 
            bet_at:23423, 
            settlement_at:23423, 
            vendor_id:23423, 

            total_win_gold:23423, 
            total_win_gold_coin:23423, 
            total_valid_bet_gold_coin:23423, 
            total_valid_bet_gold:23423, 
            total_backwater_coin:23423, 
            total_backwater:23423, 

        }
        const list=[];
        for (let index = 0; index < 10; index++) {
            list.push(obj);
        }
        return list;
    }
    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.pageData.total_bet_gold = data.total_bet_gold;
        this.pageData.total_water = data.total_water;
        this.pageData.total_valid_bet_gold = data.total_valid_bet_gold;
        this.pageData.total_win_gold = data.total_win_gold;

        this.pageData.total_bet_gold_coin = data.total_bet_gold_coin;
        this.pageData.total_water_coin = data.total_water_coin;
        this.pageData.total_valid_bet_gold_coin = data.total_valid_bet_gold_coin;
        this.pageData.total_win_gold_coin = data.total_win_gold_coin;
        this.pageData.total_backwater_coin = data.total_backwater_coin;

        const vuetify = Vue.vuetify;
        if (vuetify.framework.breakpoint.mobile) {
            const { pageCount, pageCurrent } = this.pageData.pageInfo;
            if (pageCurrent == 1) {
                this.pageData.list = data.list;
            } else {
                this.pageData.list.push(...data.list);
            }
            this.pageData.finished = pageCurrent >= pageCount;
            this.pageData.done && this.pageData.done();
        } else {
            this.pageData.list = data.list;
            //this.pageData.list = this.setTestData();
        }
    }
    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.getApi();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.getApi();
    }
    //点击了筛选之后 根据 筛选结果刷新
    refrushFilter(data: any = null) {
        //console.log("  根据 筛选结果刷新", data);
        this.pageData.listQuery.agent_user_id = data.user_id;
        if (data.is_group) {
            this.pageData.listQuery.is_group = data.is_group;
        }
        if (data.parents && data.parents.length > 0) {
            this.setFilterInfo(data);
        }
        else {
            this.removeUserList(data.user_id);
        }
        this.getApi();
        //this.setFilterInfo(data);
    }
    removeUserList(userid: any) {
        const res = this.pageData.filterBtnInfo.parents.indexOf(userid);
        //console.log(typeof userid);
        if (res == -1) {
            return;
        }
        this.pageData.filterBtnInfo.parents = this.pageData.filterBtnInfo.parents.slice(0, res + 1);
    }

    api_vendor_simple() {
        this.sendNotification(net.HttpType.api_vendor_simple);
    }

    getApi() {
        this.pageData.listQuery.agent_user_id != null ? this.api_user_var_agent_var_bet() : this.api_user_show_var_bet();
    }

    api_user_show_var_bet() {
        this.pageData.loading = true;
        const formCopy = { user_id: core.user_id };
        Object.assign(formCopy, this.pageData.listQuery);
        this.sendNotification(net.HttpType.api_user_show_var_bet, objectRemoveNull(formCopy, [undefined, null, "", 0, "0"]));
    }

    api_user_var_agent_var_bet() {
        this.pageData.loading = true;
        const formCopy: any = { user_id: core.user_id };
        Object.assign(formCopy, this.pageData.listQuery);
        //只显示已结算状态。
        if (!this.pageData.bShowOptions) formCopy.settlement_status = 11;
        this.sendNotification(net.HttpType.api_user_var_agent_var_bet, objectRemoveNull(formCopy, [undefined, null, "", 0, "0"]));
    }

}
