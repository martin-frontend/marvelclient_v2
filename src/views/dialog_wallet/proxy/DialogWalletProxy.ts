import GamePlatConfig from "@/core/config/GamePlatConfig";
import Constant from "@/core/global/Constant";
import LangUtil from "@/core/global/LangUtil";

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
        isMobile: false,
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

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        if (this.pageData.isMobile) {
            if (data.list.length > 0) {
                this.pageData.list.push(...data.list);
            }
        } else {
            this.pageData.list = data.list;
        }
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
