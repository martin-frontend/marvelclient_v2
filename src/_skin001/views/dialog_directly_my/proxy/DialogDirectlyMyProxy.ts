import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import Utils from "@/core/global/Utils";
import dialog_message from "@/views/dialog_message";

export default class DialogDirectlyMyProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyMyProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
        /**我的推广 数据 */
        promotionData: <any>{
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
            commission_info: {},
            commission_num: 0,
            pretty_user_id: 0,
        },
        statistics_data: <any>{
            total_commission: {}, // 预计今日总佣金
            total_water_summary: 0, // 今日总业绩
            self_water_summary: 0, // 自营业绩
            group_water_summary: 0, // 今日团队业绩
            direct_water_summary: 0, // 今日直属业绩
        },
        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        link: "",
        btnBind: false,
        qrCode: "",
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }
    async setLink(url: string) {
        this.pageData.link = url;
        const imgBase64 = await Utils.generateQrcode(url);
        this.pageData.qrCode = imgBase64;
    }
    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.statistics_data, data.statistics_data);
        Object.assign(this.pageData.promotionData, data);
        this.pageData.btnBind = !data.invite_user_id;
        if (data.commission_info[2].commission_num.USDT != undefined) {
            this.pageData.promotionData.commission_num = data.commission_info[2].commission_num.USDT;
        } else {
            this.pageData.promotionData.commission_num = 0;
        }
    }
    copy() {
        CopyUtil(this.pageData.link);
        dialog_message.info(LangUtil("复制成功"));
    }

    copyId() {
        const { pretty_user_id, user_id } = this.pageData.promotionData;
        CopyUtil(pretty_user_id || user_id);
        dialog_message.info(LangUtil("复制成功"));
    }
    /**业绩查询--获取推广链接*/
    api_user_var_short_chain(force: number = 0) {
        this.sendNotification(net.HttpType.api_user_var_short_chain, { user_id: core.user_id, host: location.origin, force });
    }
    /**业绩查询--按日期获取佣金详情*/
    api_user_var_commission_commissiondetail() {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_var_commission_commissiondetail, { user_id: core.user_id });
        }
    }
}
