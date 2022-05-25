export default class DialogPerformanceProxy extends puremvc.Proxy {
    static NAME = "DialogPerformanceProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            start_date: core.dateFormat(core.getTodayOffset(-6), "yyyy-MM-dd"),
            end_date: core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd"),
            page_count: 1,
            page_size: 20,
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
            start_date: core.dateFormat(core.getTodayOffset(-6), "yyyy-MM-dd"),
            end_date: core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd"),
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
}
