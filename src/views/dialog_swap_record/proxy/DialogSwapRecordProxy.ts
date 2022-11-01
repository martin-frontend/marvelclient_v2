import LangUtil from "@/core/global/LangUtil";
import Vue from "vue";

export default class DialogSwapRecordProxy extends puremvc.Proxy {
    static NAME = "DialogSwapRecordProxy";

    /**参数 */
    parameter: any = {
        user_id: 0,
        page_size: 20,
        page_count: 1,
    };

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
    //选择器
    listOptions = {
        statusOptions: () => {
            return {
                1: LangUtil("待处理"),
                2: LangUtil("处理中"),
                3: LangUtil("处理成功"),
                4: LangUtil("处理失败"),
            };
        },
    }

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
        const vuetify = Vue.vuetify;
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
        this.api_user_var_swap_order_list();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_var_swap_order_list();
    }

    /**Swap--Swap兑换订单*/
    api_user_var_swap_order_list() {
        this.pageData.loading = true;
        this.parameter.user_id = core.user_id;
        this.sendNotification(net.HttpType.api_user_var_swap_order_list, this.parameter);
    }
}
