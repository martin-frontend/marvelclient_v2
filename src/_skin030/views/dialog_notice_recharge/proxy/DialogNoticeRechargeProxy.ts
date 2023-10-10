export default class DialogNoticeRechargeProxy extends puremvc.Proxy {
    static NAME = "DialogNoticeRechargeProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        noticeArr: <any>[],
        curIndex: 0,
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        this.pageData.curIndex = 0;
    }

    setData(data: any) {
        this.pageData.loading = false;
        // Object.assign(this.pageData.noticeArr, data);
        this.pageData.noticeArr = JSON.parse(JSON.stringify(data));
        //如果是列表，使用以下数据，否则删除
        // Object.assign(this.pageData.pageInfo, data.pageInfo);
        // this.pageData.list = data.list;
    }
}
