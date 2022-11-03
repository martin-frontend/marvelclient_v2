import { objectRemoveNull } from "@/core/global/Functions";
import Vue from "vue";

export default class DialogStatisticsCreditProxy extends puremvc.Proxy {
    static NAME = "DialogStatisticsCreditProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            user_id: 0,
            start_date: "",
            end_date: "",
            page_count: 1,
            page_size: 20,
        },
        list: <any>[],
        summary: {
            record_count: 0,
            bet_gold: "",
            win_gold: "",
            water: "",
            back_water: "",
            agent_amount: "",
            credit_rate: "",
            user_id: "-",
        },
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        //加载完毕后调用，手机模式专用
        done: <any>null,
        finished: false,
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            start_date: "",
            end_date: "",
            page_count: 1,
            page_size: 20,
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        Object.assign(this.pageData.summary, data.summary);
        const vuetify = Vue.vuetify;
        if (vuetify.framework.breakpoint.xsOnly) {
            const { pageCount, pageCurrent } = this.pageData.pageInfo;
            if (pageCurrent == 1) {
                this.pageData.list = data.list;
            } else {
                this.pageData.list.push(...data.list);
            }
            this.pageData.finished = pageCurrent >= pageCount;
            this.pageData.done && this.pageData.done();
        } else {
            this.pageData.list = data.list;
        }
    }

    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_credit_statistic();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_var_credit_statistic();
    }

    api_user_var_credit_statistic() {
        this.pageData.loading = true;
        this.pageData.listQuery.user_id = core.user_id;
        this.sendNotification(net.HttpType.api_user_var_credit_statistic, objectRemoveNull(this.pageData.listQuery));
    }
}
