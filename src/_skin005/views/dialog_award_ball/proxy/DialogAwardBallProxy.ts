export default class DialogAwardBallProxy extends puremvc.Proxy {
    static NAME = "DialogAwardBallProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        data: <any>{
            ball_code: -1,
            award: <any>{},
        },
        onCloseFun: <Function | null>null,
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {}

    setData(data: any) {
        Object.assign(this.pageData.data, data);
    }
}
