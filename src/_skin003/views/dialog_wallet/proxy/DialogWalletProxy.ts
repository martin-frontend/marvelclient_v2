import GamePlatConfig from "@/core/config/GamePlatConfig";
import Constant from "@/core/global/Constant";
import LangUtil from "@/core/global/LangUtil";
import Vue from "vue";

export default class DialogWalletProxy extends puremvc.Proxy {
    static NAME = "DialogWalletProxy";

    pageData = {
        loading: false,
        bShow: false,
        tabIndex: 0,

        gold_info: <any>{},

        //资产明细列表
        listQuery: {
            type: <any>null,
            start_date: <any>null,
            end_date: <any>null,
            coin_name_unique: <any>null,
            page_count: 1,
            page_size: 20,
        },
        list: <any>[],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        //选择器相关
        listOptions: {
            timeSelect: 0,
            coinSelect: 0,
            typeSelect: 0,
            timeOptions: () => {
                return Constant.TIME_TYPE;
            },
            coinOptions: () => {
                const keys = Object.keys(GamePlatConfig.config.plat_coins);
                keys.unshift(LangUtil("全部币种"));
                return keys;
            },
            typeOptions: () => {
                const types = {
                    0: LangUtil("全部类型"),
                };
                Object.assign(types, GamePlatConfig.enums.user_gold_log_type);
                return types;
            },
        },
        // 列表是否加载完成，手机模式专用
        finished: false,
        done: <any>null,
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            type: null,
            start_date: null,
            end_date: null,
            coin_name_unique: null,
            page_count: 1,
            page_size: 20,
        });
    }
    setTestDetailData() {
        const obj = {
            type: 0,
            coin_name_unique: "USDT",
            gold: 1564,
            balance: 1231,
            remark: "sadsda",
            created_at: "2022-12-14 18:37:14",
        };
        const list_1 = [];
        for (let index = 0; index < 20; index++) {
            list_1.push(obj);
        }
        return list_1;
    }
    setTestVendorData() {
        const obj = {
            vendor_name: "测试111",
            currency: "us12312dt",
            gold: 1564,
            balance: 1231,
            remark: "sadsda",
            type: 0,
            created_at: "2022-12-14 18:37:14",
        };
        const list_1 = [];
        for (let index = 0; index < 4; index++) {
            list_1.push(obj);
        }

        const gold_info = {
            USDT: {
                vendors_detail: list_1,
                vendors_money: "13231",
            },
            CNY: {
                vendors_detail: list_1,
                vendors_money: "13231",
            },
        };

        return gold_info;
    }
    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        const vuetify = Vue.vuetify;
        if (vuetify.framework.breakpoint.xsOnly) {
            const { pageCount, pageCurrent } = this.pageData.pageInfo;
            if (pageCurrent == 1) {
                this.pageData.list = data.list;
                //this.pageData.list = this.setTestData();
            } else {
                this.pageData.list.push(...data.list);
            }
            this.pageData.finished = pageCount == pageCurrent;
            this.pageData.done && this.pageData.done();
        } else {
            this.pageData.list = data.list;
            //this.pageData.list = this.setTestData();
        }
        //厂商数据
        //this.pageData.gold_info = JSON.parse(JSON.stringify( this.setTestVendorData())) ;
        //this.pageData.list = this.setTestDetailData();
    }

    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_show_var_gold();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_show_var_gold();
    }

    api_user_show_var_gold() {
        this.pageData.loading = true;
        const formCopy = { user_id: core.user_id };
        Object.assign(formCopy, this.pageData.listQuery);
        this.sendNotification(net.HttpType.api_user_show_var_gold, formCopy);
    }

    api_user_var_vendor_withdraw(coin_name_unique: string) {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_vendor_withdraw, { coin_name_unique, user_id: core.user_id });
    }

    api_user_show_var() {
        this.sendNotification(net.HttpType.api_user_show_var, { user_id: core.user_id, modules: JSON.stringify([2]) });
    }
}

/*
user_gold_log_type:
4: "内部划转"
5: "平台充值"
6: "平台兑换"
7: "银行存取"
8: "平台赠送"
9: "平台兑换失败退款"
10: "平台扣款"
11: "游戏厂商上分"
12: "游戏厂商下分"
13: "游戏厂商上分失败返还"
14: "实时返水"
15: "推广返佣"
16: "保险箱存款"
17: "保险箱提款"
18: "兑换订单扣款"
19: "兑换订单退款"
20: "兑换订单失败退款"
21: "兑换订单退款"
40: "活动赠送"
41: "充值赠送"
42: "金币划转"
43: "金币划转手续费"
44: "总代分红"
45: "整盘分红"
46: "商户用户上分"
47: "商户用户下分"
48: "质押"
49: "自动解质押"
50: "手动解质押"
51: "币分红"
52: "自动解质押手续费"
53: "手动解质押手续费"
*/
