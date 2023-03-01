export default class DialogPreviewProxy extends puremvc.Proxy {
    static NAME = "DialogPreviewProxy";

    pageData = {
        bShow: false,
        bHidden:false, //暂时隐藏
        url: "",
    };
}
