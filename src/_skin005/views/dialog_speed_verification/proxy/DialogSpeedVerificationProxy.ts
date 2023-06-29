export default class DialogSpeedVerificationProxy extends puremvc.Proxy {
    static NAME = "DialogSpeedVerificationProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        successCallback: <Function | null>null,
        failCallback: <Function | null>null,
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        // Object.assign(this.pageData.listQuery, {
        //     page_count: 1,
        //     page_size: 20,
        // });
    }

    setData(data: any) {
        this.pageData.loading = false;
        // //如果是列表，使用以下数据，否则删除
        // Object.assign(this.pageData.pageInfo, data.pageInfo);
        // this.pageData.list = data.list;
    }
}
