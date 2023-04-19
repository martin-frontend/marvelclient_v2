export default class DialogBankcardInfoProxy extends puremvc.Proxy {
    static NAME = "DialogBankcardInfoProxy";

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
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }

    setTestData() {
        const obj = {
            bankname: "测试",
            name: "aasdas",
            cardnub: 126345684789561456465,
            remark: "qweasdasd",
        };
        const arr = [];
        for (let index = 0; index < 20; index++) {
            arr.push(obj);
        }
        return arr;
    }
    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        // Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.pageData.list = data;
        //this.pageData.list = this.setTestData();
    }
}
