export default class DialogNoticeDetailProxy extends puremvc.Proxy {
    static NAME = "DialogNoticeDetailProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        data: <core.ActivityDetailVO>{},
    };
}
