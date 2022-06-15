export default class DialogActivityProxy extends puremvc.Proxy {
    static NAME = "DialogActivityProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
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
        if (this.pageData.isMobile) {
            if (data.list.length > 0) {
                this.pageData.list.push(...data.list);
            }
        } else {
            this.pageData.list = data.list;
        }
    }

    /**获取活动列表 */
    api_plat_activity() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_plat_activity, { user_id: core.user_id });
    }
}
