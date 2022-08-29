import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";

export default class DialogPromotionStatisticsProxy extends puremvc.Proxy {
    static NAME = "DialogPromotionStatisticsProxy";
 
    pageData = {
        loading: false,
        bShow: false,
        //查询数据 
        listQuery: {
            user_id: core.user_id,
            agent_user_id: core.user_id,
            from_date: dateFormat(getTodayOffset(-1), "yyyy-MM-dd"),
            to_date: dateFormat(getTodayOffset(-1), "yyyy-MM-dd"),
        },
        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
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

    api_user_var_agent_var_statistic_promotion() {
        this.sendNotification(net.HttpType.api_user_var_agent_var_statistic_promotion, objectRemoveNull(this.pageData.listQuery));
    }
}
