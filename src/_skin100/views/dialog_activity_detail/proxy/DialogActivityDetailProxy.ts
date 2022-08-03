export default class DialogActivityDetailProxy extends puremvc.Proxy {
    static NAME = "DialogActivityDetailProxy";

    pageData = {
        loading: false,
        bShow: false,
        data: <core.ActivityDetailVO>{},
    };
}
