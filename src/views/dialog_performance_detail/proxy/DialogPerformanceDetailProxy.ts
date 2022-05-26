import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";

export default class DialogPerformanceDetailProxy extends puremvc.Proxy {
    static NAME = "DialogPerformanceDetailProxy";

    /**参数 */
    parameter: any = {
        date: dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss").split(" ")[0],
    };

    pageData = {
        loading: false,
        bShow: false,
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

    categoryIcons: any = {
        2: {
            label: "棋牌",
        },
        4: {
            label: "彩票",
        },
        8: {
            label: "捕鱼",
        },
        16: {
            label: "电子",
        },
        32: {
            label: "真人",
        },
        64: {
            label: "体育",
        },
        128: {
            label: "电竞",
        },
    };

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

    /**写入 详情 */
    setCommissionDetail(body: any) {
        this.pageData.list = [];
        const data: any = JSON.parse(JSON.stringify(body));
        this.pageData.group_users = data.group_users;
        this.pageData.directly_users = data.directly_users;
        this.pageData.today_group_users = data.today_group_users;
        this.pageData.today_directly_users = data.today_directly_users;
        Object.assign(this.pageData.statistics_data, data.statistics_data);
        Object.assign(this.pageData.original, data);
        Object.keys(data.commission_info).forEach((key) => {
            this.pageData.list.push({
                type: key,
                total_water: data.commission_info[key].total_water,
                self_water: data.commission_info[key].self_water,
                direct_water: data.commission_info[key].direct_water,
                group_water: data.commission_info[key].group_water,
                commission_num: `USDT:${data.commission_info[key].commission_num[`USDT`]}`,
                total_commission: `USDT:${data.commission_info[key].total_commission[`USDT`]}`,
            });
        });
    }

    /**写入 直属详情 */
    setCommissionDirectswater(body: any) {
        console.log("setCommissionDirectswater:", body);
        // if (body.length == 0) {
        //     return false;
        // }
        // const data: any = JSON.parse(JSON.stringify(body));
        // if (data.list.length > 0) {
        //     const waterInfo = data.list[0].water_info;

        //     Object.keys(waterInfo).forEach((key: any) => {
        //         this.directlyDetails.list.push({
        //             group_users: data.list[0].group_users,
        //             nick_name: data.list[0].nick_name,
        //             user_id: data.list[0].user_id,
        //             type: key,
        //             commission_num: `${waterInfo[key].commission_num} ${waterInfo[key].commission_info == 1 ? "(保)" : ""}`,
        //             group_water: waterInfo[key].group_water,
        //             is_promotion_floor: waterInfo[key].is_promotion_floor,
        //             self_water: waterInfo[key].self_water,
        //         });
        //     });
        // }
    }

    /**--代理推广--按日期获取佣金详情*/
    api_user_var_commission_commissiondetail() {
        const obj: any = {
            ...this.parameter,
            user_id: core.user_id,
        };
        this.sendNotification(net.HttpType.api_user_var_commission_commissiondetail, objectRemoveNull(obj));
    }

    /**--代理推广--按日期查询直属代理流水详情*/
    api_user_var_commission_directswater() {
        const obj: any = {
            ...this.parameter,
            user_id: core.user_id,
        };
        this.sendNotification(net.HttpType.api_user_var_commission_directswater, objectRemoveNull(obj));
    }
}
