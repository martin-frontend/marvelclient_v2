export default class DialogKycProxy extends puremvc.Proxy {
    static NAME = "DialogKycProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
    };
}
