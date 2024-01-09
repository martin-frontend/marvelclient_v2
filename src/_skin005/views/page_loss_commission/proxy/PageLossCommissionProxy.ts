import Utils from "@/core/global/Utils";

export default class PageLossCommissionProxy extends puremvc.Proxy {
    static NAME = "PageLossCommissionProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        this.api_user_var_direct_commission_detail();
        this.api_user_var_short_chain();
    }

    pageData = {
        loading: false,

        /**本期分红信息 */
        commissionDetail: {
            settlement_date_start: "", // 分红开始时间
            settlement_date_end: "", // 分红结束时间
            settlement_date: "", // 本期分红发放时间
            direct_commission: 0, // 预计分红
            directly_total_win_loss: 0, // 直属总输赢
            bonus_ratio: 0, // 分红比例
            total_directly_users: 0, // 直属人数
            directly_users: 0, // 直属新增
        },
        /**推广链接和它对应的qrcode */
        promotion_link: "",
        promotion_qrCode: "",

        /**业绩详情 */
        performance: {
            bShow: false,

            listQuery: {
                settlement_date_start: "",
                settlement_date_end: "",
            },

            list: <{ created_date: string; directly_total_win_loss: string }[]>[],

            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 20,
                pageTotal: 1,
            },

            summary: {
                directly_total_win_loss: "0.00",
            },
        },

        /**直属详情 */
        directDetail: {
            bShow: false,
            loading: false,
            // 列表是否加载完成，手机模式专用
            finished: false,
            done: <any>null,

            listQuery: {
                settlement_date: "",
                page_size: 20,
                page_count: 0,
            },

            list: <{ user_id: number; binded_at: string; total_win_loss: number }[]>[],

            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 20,
                pageTotal: 1,
            },

            summary: {
                directly_total_win_loss: 0, // 直属总输赢
                total_directly_users: 0, // 直属人数
                directly_users: 0, // 直属新增
            },
        },

        /**历史分红记录 */
        bonusHistory: {
            bShow: false,
            loading: false,
            // 列表是否加载完成，手机模式专用
            finished: false,
            done: <any>null,

            listQuery: {
                page_size: 10,
                page_count: 0,
            },

            list: <
                {
                    id: number;
                    user_id: number;
                    data_belong: string;
                    plat_id: number;
                    channel_id: number;
                    settlement_date: string;
                    run_status: number;
                    bonus_ratio: string; // 分红比例
                    settlement_date_start: string; // 分红开始时间
                    settlement_date_end: string; // 分红结束时间
                    send_bonus_status: number;
                    send_bonus_time: string;
                    direct_commission: string; // 分红金额
                    direct_total_win_loss: string; // 直属输赢
                    settlement_type: number;
                    created_by: string;
                    updated_by: string;
                    created_at: string;
                    updated_at: string;
                }[]
            >[],

            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 20,
                pageTotal: 1,
            },

            summary: {
                direct_commission: "0.00", // 历史总分红
            },
        },
    };

    set_user_var_direct_commission_detail(data: any) {
        Object.assign(this.pageData.commissionDetail, data);
    }

    set_user_var_direct_commission_index(data: any) {
        const { performance } = this.pageData;
        const { list, pageInfo, summary } = data;
        performance.list = list;
        Object.assign(performance.pageInfo, pageInfo);
        Object.assign(performance.summary, summary);
    }

    set_user_var_direct_commission_direct_index(data: any) {
        this.pageData.directDetail.loading = false;
        const { directDetail } = this.pageData;
        const { list, pageInfo, summary } = data;

        Object.assign(directDetail.pageInfo, pageInfo);
        Object.assign(directDetail.summary, summary);

        const { pageCurrent, pageCount } = directDetail.pageInfo;

        if (window.$mobile && pageCount > 1) {
            directDetail.list.push(...list);
        } else {
            directDetail.list = list;
        }

        if (pageCount == pageCurrent) {
            directDetail.finished = true;
        }

        if (directDetail.done) directDetail.done();
    }

    set_user_var_direct_commission_bonus_index(data: any) {
        this.pageData.bonusHistory.loading = false;
        const { bonusHistory } = this.pageData;
        const { list, pageInfo, summary } = data;

        Object.assign(bonusHistory.pageInfo, pageInfo);
        Object.assign(bonusHistory.summary, summary);

        const { pageCurrent, pageCount } = bonusHistory.pageInfo;

        if (window.$mobile && pageCurrent > 1) {
            bonusHistory.list.push(...list);
        } else {
            bonusHistory.list = list;
        }

        if (pageCount == pageCurrent) {
            bonusHistory.finished = true;
        }

        if (bonusHistory.done) bonusHistory.done();
    }

    async set_user_var_short_chain(data: any) {
        this.pageData.promotion_link = data.url;
        const imgBase64 = await Utils.generateQrcode(data.url);
        this.pageData.promotion_qrCode = imgBase64;
    }

    api_user_var_direct_commission_detail() {
        this.sendNotification(net.HttpType.api_user_var_direct_commission_detail, { user_id: core.user_id });
    }

    api_user_var_direct_commission_index(settlement_date_start: string, settlement_date_end: string) {
        const { listQuery } = this.pageData.performance;
        Object.assign(listQuery, {
            settlement_date_start,
            settlement_date_end,
        });
        this.sendNotification(net.HttpType.api_user_var_direct_commission_index, {
            user_id: core.user_id,
            ...listQuery,
        });
    }

    api_user_var_direct_commission_direct_index(settlement_date?: string) {
        const { directDetail } = this.pageData;
        const { listQuery } = directDetail;
        directDetail.loading = directDetail.finished = false;
        if (settlement_date) listQuery.settlement_date = settlement_date;
        this.sendNotification(net.HttpType.api_user_var_direct_commission_direct_index, {
            user_id: core.user_id,
            ...listQuery,
        });
    }

    api_user_var_direct_commission_bonus_index() {
        const { bonusHistory } = this.pageData;
        const { listQuery } = bonusHistory;
        bonusHistory.loading = bonusHistory.finished = false;
        this.sendNotification(net.HttpType.api_user_var_direct_commission_bonus_index, { user_id: core.user_id, ...listQuery });
    }

    /**业绩查询--获取推广链接*/
    api_user_var_short_chain(force: number = 0) {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_var_short_chain, { user_id: core.user_id, host: location.origin, force });
        }
    }
}
