export default class DialogActivityDetailProxy extends puremvc.Proxy {
    static NAME = "DialogActivityDetailProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden:false, //暂时隐藏
        data: <core.ActivityDetailVO>{},
    };
}
