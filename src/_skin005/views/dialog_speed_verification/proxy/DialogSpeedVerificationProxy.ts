import { getAuthDragValue } from "@/_skin005/core/AuthDragFun";

export default class DialogSpeedVerificationProxy extends puremvc.Proxy {
    static NAME = "DialogSpeedVerificationProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        successCallback: <Function | null>null,
        failCallback: <Function | null>null,
        verification: 0, //块所在的位置
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        // Object.assign(this.pageData.listQuery, {
        //     page_count: 1,
        //     page_size: 20,
        // });
    }

    setData(data: any) {
        this.pageData.verification = getAuthDragValue(data);
    }
}
