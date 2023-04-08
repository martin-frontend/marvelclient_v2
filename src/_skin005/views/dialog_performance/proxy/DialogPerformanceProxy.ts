import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import Constant from "@/core/global/Constant";

export default class DialogPerformanceProxy extends puremvc.Proxy {
    static NAME = "DialogPerformanceProxy";

    /**参数 */
    // parameter: any = {
    //     end_date: dateFormat(getTodayOffset(0), "yyyy-MM-dd"),
    //     start_date: dateFormat(getTodayOffset(0 + 1, 1), "yyyy-MM-dd"),
    // };

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        summary: {
            direct_water: "",
            group_water: "",
            total_water: "",
        },
        listQuery: {
            start_date: core.dateFormat(core.getTodayOffset(-6), "yyyy-MM-dd"),
            end_date: core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd"),
        },
    };

    //选择器
    listOptions = {
        timeSelect: 0,
        timeOptions: () => {
            return Constant.PERFORMANCE_TIME_TYPE;
        },
    };

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.pageData.list = data.list;
    }

    /** 日期选择 */
    // onSelectDay(offset: any = 0) {
    //     if (offset == -1) {
    //         this.parameter.end_date = dateFormat(getTodayOffset(offset), "yyyy-MM-dd");
    //         this.parameter.start_date = dateFormat(getTodayOffset(offset + 1, 1), "yyyy-MM-dd");
    //     } else {
    //         this.parameter.end_date = dateFormat(getTodayOffset(0), "yyyy-MM-dd");
    //         this.parameter.start_date = dateFormat(getTodayOffset(offset + 1, 1), "yyyy-MM-dd");
    //     }
    //     this.api_user_var_commission_commissionlist();
    // }

    /**写入 业绩查询 */
    setCommissionlist(body: any) {
        this.pageData.list = body.list;
        this.pageData.loading = false;
        Object.assign(this.pageData.summary, body.summary);
    }

    /**--代理推广--业绩查询*/
    api_user_var_commission_commissionlist() {
        this.pageData.loading = true;
        const formCopy = { user_id: core.user_id };
        Object.assign(formCopy, this.pageData.listQuery);
        this.sendNotification(
            net.HttpType.api_user_var_commission_commissionlist,
            objectRemoveNull(formCopy, [undefined, null, "", 0, "0"])
        );
    }
}
