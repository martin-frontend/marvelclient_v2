import LangUtil from "@/core/global/LangUtil";
import { getVuetify } from "@/_skin100/plugins/vuetify";

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
        // 列表是否加载完成，手机模式专用
        finished: false,
        done: <any>null,
    };

    statusOptions = {
        0: LangUtil("待支付"),
        1: LangUtil("成功"),
        2: LangUtil("失败"),
        3: LangUtil("玩家已支付等待确认"),
    };
    statusColorOptions = {
        0: "yellow--text text--lighten-2",
        1: "teal--text text--accent-2",
        2: "deep-orange--text text--darken-1",
        3: "yellow--text text--lighten-2",
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
        const vuetify = getVuetify();
        if (vuetify.framework.breakpoint.xsOnly) {
            const { pageCount, pageCurrent } = this.pageData.pageInfo;
            if (pageCurrent == 1) {
                this.pageData.list = data.list;
            } else {
                this.pageData.list.push(...data.list);
            }
            this.pageData.finished = pageCount == pageCurrent;
            this.pageData.done && this.pageData.done();
        } else {
            this.pageData.list = data.list;
        }
    }

    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_recharge_list();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_var_recharge_list();
    }

    api_user_var_recharge_list() {
        this.pageData.loading = true;
        const obj = { user_id: core.user_id };
        Object.assign(obj, this.pageData.listQuery);
        this.sendNotification(net.HttpType.api_user_var_recharge_list, obj);
    }
}
