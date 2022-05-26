import {
    dateFormat,
    getTodayOffset,
    objectRemoveNull,
} from "@/core/global/Functions";

export default class PageExtensionProxy extends puremvc.Proxy {
    static NAME = "PageExtensionProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        this.api_user_var_commission_commissiondetail();
        this.api_user_var_commission_commissionnum();
    }

    /**我的推广 数据 */
    promotionData: any = {
        commission_awaiting_num: {},
        commission_received_num: {},
        date: "",
        directly_users: 0,
        group_users: 0,
        invite_user_id: 0,
        is_agent_bonus: 0,
        is_promotion_statistics_display: 0,
        plat_id: 0,
        promotion_floor_unit: "",
        promotion_status: 1,
        promotion_tutorial_url: "",
        promotion_url: "",

        today_directly_users: 0,
        today_group_users: 0,
        user_id: 0,
        total_water: 0,
    };

    statistics_data: any = {
        total_water_summary: 0,    // 总业绩
        self_water_summary: 0,       // 自营业绩
        group_water_summary: 0,    // 团队业绩
        direct_water_summary: 0,     // 直属业绩
    };
    is_promotion_statistics_display: any = false;
    link: any = "";
    btnBind: any = false;
    qrCode: any = "";

    setData(data: any) {
        Object.assign(this.statistics_data, data.statistics_data);
        Object.assign(this.promotionData, data);
        this.btnBind = !data.invite_user_id;
    }

    /** 写入 返佣等级 */
    setCommissionCommissionnum(body: any) {
        const data: any = JSON.parse(JSON.stringify(body));
        this.tableData.myCommissionNum = data.my_commission_num;
        this.tableData.promotionConfig = JSON.parse(JSON.stringify(data.promotion_config));
        this.tableData.defaultPromotionConfig = JSON.parse(JSON.stringify(data.promotion_config));
        this.tableData.type = data.type;
        Object.keys(data.promotion_config).forEach((key: any) => {
            this.tableData.promotionConfig[key].forEach((config: any, idx: any) => {
                config["level"] = idx + 1;
            });

            this.tableData.defaultPromotionConfig[key].forEach((config: any, idx: any, arr: any) => {
                config["level"] = idx + 1;
            });
        });
    }

    /**表单 数据 */
    tableData: any = {
        myCommissionNum: {
            0: {},
            2: {},
            4: {},
            8: {},
            16: {},
            32: {},
            64: {},
            128: {},
        },
        promotionConfig: {},
        defaultPromotionConfig: {},
        type: 0,
    };

    /**参数 */
    parameter: any = {
        user_id: core.user_id,
    };

    pageData = {
        loading: false,
    };

    /**查询数据 */
    listQuery = {
        user_id: core.user_id,
        agent_user_id: core.user_id,
        from_date: dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss").split(" ")[0],
        to_date: dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss").split(" ")[0],
    };

    /**领取佣金 */
    api_user_var_commission_receive() {
        this.sendNotification(net.HttpType.api_user_var_commission_receive, {
            user_id: core.user_id,
        });
    }

    /**业绩查询--按日期获取佣金详情*/
    api_user_var_commission_commissiondetail() {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_var_commission_commissiondetail, { user_id: core.user_id });
        }
    }

    /**业绩查询--获取用户推广统计信息*/
    api_user_var_agent_var_statistic_promotion() {
        this.sendNotification(net.HttpType.api_user_var_agent_var_statistic_promotion, objectRemoveNull(this.listQuery));
    }

    /**业绩查询--返佣等级*/
    api_user_var_commission_commissionnum() {
        this.sendNotification(net.HttpType.api_user_var_commission_commissionnum, objectRemoveNull({ ...this.parameter }));
    }
}