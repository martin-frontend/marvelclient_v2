import LangUtil from "@/core/global/LangUtil";

export default class DialogRecordRechargeProxy extends puremvc.Proxy {
    static NAME = "DialogRecordRechargeProxy";

    pageData = {
        loading: false,
        bShow: false,
        listQuery: {
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
        isMobile: false,
    };

    statusOptions = {
        0: LangUtil("待支付"),
        1: LangUtil("成功"),
        2: LangUtil("失败"),
        3: LangUtil("玩家已支付等待确认"),
    };

    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        if (this.pageData.isMobile) {
            if (data.list.length > 0) {
                this.pageData.list.push(...data.list);
            }
        } else {
            this.pageData.list = data.list;
        }
    }

    api_user_var_recharge_list() {
        this.pageData.loading = true;
        const obj = { user_id: core.user_id };
        Object.assign(obj, this.pageData.listQuery);
        this.sendNotification(net.HttpType.api_user_var_recharge_list, obj);
    }
}
