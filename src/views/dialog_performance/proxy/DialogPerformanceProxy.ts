import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";

export default class DialogPerformanceProxy extends puremvc.Proxy {
    static NAME = "DialogPerformanceProxy";

    /**参数 */
    parameter: any = {
        end_date: dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss").split(" ")[0],
        start_date: dateFormat(getTodayOffset(0 + 1, 1), "yyyy-MM-dd hh:mm:ss").split(" ")[0],
    };

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        // listQuery: {
        //     start_date: core.dateFormat(core.getTodayOffset(-6), "yyyy-MM-dd"),
        //     end_date: core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd"),
        //     page_count: 1,
        //     page_size: 20,
        // },
        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };
    //如果是列表，使用以下数据，否则删除
    // resetQuery() {
    //     Object.assign(this.pageData.listQuery, {
    //         start_date: core.dateFormat(core.getTodayOffset(-6), "yyyy-MM-dd"),
    //         end_date: core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd"),
    //         page_count: 1,
    //         page_size: 20,
    //     });
    // }

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.pageData.list = data.list;
    }

    /** 日期选择 */
    onSelectDay(offset: any = 0) {
        // console.log("offset", offset);
        if (offset == -1) {
            // console.log("昨日");
            this.parameter.end_date = dateFormat(getTodayOffset(offset), "yyyy-MM-dd hh:mm:ss").split(" ")[0];
            this.parameter.start_date = dateFormat(getTodayOffset(offset + 1, 1), "yyyy-MM-dd hh:mm:ss").split(" ")[0];
        } else {
            this.parameter.end_date = dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss").split(" ")[0];
            this.parameter.start_date = dateFormat(getTodayOffset(offset + 1, 1), "yyyy-MM-dd hh:mm:ss").split(" ")[0];
        }

        this.api_user_var_commission_commissionlist();
    }

    /**写入 业绩查询 */
    setCommissionlist(body: any) {
        this.pageData.list = body.list;
        // this.commissionData.list = JSON.parse(JSON.stringify(body.list));
    }

    /**--代理推广--业绩查询*/
    api_user_var_commission_commissionlist() {
        const obj: any = {
            ...this.parameter,
            user_id: core.user_id,
        };
        this.sendNotification(net.HttpType.api_user_var_commission_commissionlist, objectRemoveNull(obj));
    }

}
