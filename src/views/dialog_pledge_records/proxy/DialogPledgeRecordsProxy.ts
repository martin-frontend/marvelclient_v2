export default class DialogPledgeRecordsProxy extends puremvc.Proxy {
    static NAME = "DialogPledgeRecordsProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            cate: 0,
            page_count: 1,
            page_size: 20,
        },
        list: [
            { date: '2010-10-12 12:12:12', amount: "100000,000,000" },
            { date: '2010-10-12 12:12:12', amount: "100000,000,000" },
            { date: '2010-10-12 12:12:12', amount: "100000,000,000" },
            { date: '2010-10-12 12:12:12', amount: "100000,000,000" },
            { date: '2010-10-12 12:12:12', amount: "100000,000,000" },
            { date: '2010-10-12 12:12:12', amount: "100000,000,000" },
        ],
        deList: [
            { date: '2010-10-12 12:12:12', type: "系统", amount: "100000,000,000" },
            { date: '2010-10-12 12:12:12', type: "系统", amount: "100000,000,000" },
            { date: '2010-10-12 12:12:12', type: "系统", amount: "100000,000,000" },
            { date: '2010-10-12 12:12:12', type: "系统", amount: "100000,000,000" },
            { date: '2010-10-12 12:12:12', type: "系统", amount: "100000,000,000" },
            { date: '2010-10-12 12:12:12', type: "系统", amount: "100000,000,000" },
        ],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        lcusd: require(`@/assets/extension/lcusd.png`),
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
}
