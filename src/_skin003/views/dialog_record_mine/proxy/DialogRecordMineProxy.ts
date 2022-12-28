import Vue from "vue";

export default class DialogRecordMineProxy extends puremvc.Proxy {
    static NAME = "DialogRecordMineProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
            user_id: core.user_id,
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
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }
    settestData()
    {
        //item.total_backwater[Object.keys(item.total_backwater)[1]]
        const obj = {
            created_at:"2022-12-14 18:37:14",
            total_backwater:{
                0:789667,
                1:7890989,
                2:675675,
            },
            total_water:34234,
        }

        const list = <any>[];
        for (let i = 0; i < 10; i++) {
            list.push(obj); 
        }
        return list;
    }
    setData(data: any) {
        this.pageData.loading = false;
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
        //this.pageData.list=this.settestData();
    }
    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_backwater();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_var_backwater();
    }
    /**获取用户返水记录 */
    api_user_var_backwater() {
        this.pageData.loading = true;
        this.pageData.listQuery.user_id = core.user_id;
        this.sendNotification(net.HttpType.api_user_var_backwater, this.pageData.listQuery);
    }
    /**获取用户返水详情 */
    api_user_var_backwater_var(backwater_id: any) {
        this.sendNotification(net.HttpType.api_user_var_backwater_var, {
            user_id: core.user_id,
            id: backwater_id,
        });
    }
}
