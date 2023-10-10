export default class DialogLimitedBonusProxy extends puremvc.Proxy {
    static NAME = "DialogLimitedBonusProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        timeCount: 0, //当前的剩余时间
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
