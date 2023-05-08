import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import GameConfig from "@/core/config/GameConfig";
import { amountFormat, dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";

export default class DialogPerformanceDetailProxy extends puremvc.Proxy {
    static NAME = "DialogPerformanceDetailProxy";
    LangUtil = LangUtil;

    /**参数 */
    parameter: any = {
        date: dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss").split(" ")[0],
    };

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            cate: 0,
            page_count: 1,
            page_size: 20,
        },
        list: <any>[],
        directList: <any>[],
        group_users: "0" /**团队用户数 */,
        directly_users: "0" /**直属用户数 */,
        today_directly_users: "0", // 新增直属用户数
        today_group_users: "0", // 新增团队用户数
        statistics_data: {
            total_commission: "0" /**拥金总额 */,
            total_water_summary: "0.00", //总业绩
        },
        original: {},
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };

    _transformMoney(val: any, target_coin_name: string, src_coin_name: string) {
        return CoinTransformHelper.TransformMoney(val, 2, target_coin_name, src_coin_name, true, true, false, false);
    }
    transformMoney(val: any) {
        return this._transformMoney(val, GameConfig.config.SettlementCurrency, "USDT");
    }

    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            cate: 0,
            page_count: 1,
            page_size: 20,
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.pageData.list = data.list;
    }

    curCoinName = "USDT";

    /**写入 详情 */
    setCommissionDetail(body: any) {
        this.pageData.loading = false;
        this.pageData.list = [];
        const data: any = JSON.parse(JSON.stringify(body));
        this.pageData.group_users = data.group_users;
        this.pageData.directly_users = data.directly_users;
        this.pageData.today_group_users = data.today_group_users;
        this.pageData.today_directly_users = data.today_directly_users;

        const coinname = Object.keys(body.commission_awaiting_num);
        this.curCoinName = coinname[0];

        console.log("当前币种  为", this.curCoinName);

        Object.assign(this.pageData.statistics_data, data.statistics_data);
        Object.assign(this.pageData.original, data);
        Object.keys(data.commission_info).forEach((key) => {
            const keys = Object.keys(data.commission_info[key].commission_num);
            const commission_num_name = keys[0];
            let meiwan = data.commission_info[key].commission_num[commission_num_name];
            if (!ModulesHelper.RebateDisplayType()) {
                meiwan = meiwan / 100;
            }
            let meiwan_res = this.transformMoney_commission(meiwan, commission_num_name);

            if (!ModulesHelper.RebateDisplayType()) {
                meiwan_res = meiwan_res + "%";
            }

            const keys_2 = Object.keys(data.commission_info[key].total_commission);
            const total_commission_name = keys_2[0];

            this.pageData.list.push({
                type: key,
                total_water: this.transformMoney(data.commission_info[key].total_water),
                self_water: this.transformMoney(data.commission_info[key].self_water),
                direct_water: this.transformMoney(data.commission_info[key].direct_water),
                group_water: this.transformMoney(data.commission_info[key].group_water),
                // commission_num: `${data.commission_info[key].commission_num[this.curCoinName]}`,
                // total_commission: `${data.commission_info[key].total_commission[this.curCoinName]}`,
                commission_num: meiwan_res,
                total_commission: this._transformMoney(
                    data.commission_info[key].total_commission[total_commission_name],
                    total_commission_name,
                    total_commission_name
                ),
            });
        });
    }
    transformMoney_commission(val: any, coinname: string) {
        const sss = val * CoinTransformHelper.GetCoinScale(coinname);
        return CoinTransformHelper.GetCoinSymbol(coinname) + amountFormat(sss, true);
    }
    setTestData() {
        const obj = {
            nick_name: "asdasd",
            user_id: "312312",
            group_users: 12,
            water_info: {
                "2": {
                    group_water: "123",
                    self_water: "123",
                    is_promotion_floor: "1",
                    commission_num: {
                        USDT: "654",
                    },
                },
                "4": {
                    group_water: "123",
                    self_water: "123",
                    is_promotion_floor: "1",
                    commission_num: {
                        USDT: "654",
                    },
                },
                "8": {
                    group_water: "123",
                    self_water: "123",
                    is_promotion_floor: "1",
                    commission_num: {
                        USDT: "654",
                    },
                },
            },
        };

        const list = <any>[];
        const count = 10;
        for (let index = 0; index < count; index++) {
            list.push(obj);
        }
        return list;
    }
    /**写入 直属详情 */
    setCommissionDirectswater(body: any) {
        this.pageData.loading = false;
        if (body.list.length > 0) {
            this.pageData.directList = body.list;
        }
        //this.pageData.directList = this.setTestData();
    }

    /**--代理推广--按日期获取佣金详情*/
    api_user_var_commission_commissiondetail() {
        this.pageData.loading = true;
        const obj: any = {
            ...this.parameter,
            user_id: core.user_id,
        };
        this.sendNotification(net.HttpType.api_user_var_commission_commissiondetail, objectRemoveNull(obj));
    }

    /**--代理推广--按日期查询直属代理流水详情*/
    api_user_var_commission_directswater() {
        this.pageData.loading = true;
        const obj: any = {
            ...this.parameter,
            user_id: core.user_id,
        };
        this.sendNotification(net.HttpType.api_user_var_commission_directswater, objectRemoveNull(obj));
    }
}
