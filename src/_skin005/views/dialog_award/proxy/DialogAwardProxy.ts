export default class DialogAwardProxy extends puremvc.Proxy {
    static NAME = "DialogAwardProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden:false, //暂时隐藏
        data: <any>{},
    };
}
