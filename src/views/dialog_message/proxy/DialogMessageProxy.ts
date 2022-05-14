export default class DialogMessageProxy extends puremvc.Proxy {
    static NAME = "DialogMessageProxy";

    pageData = {
        bShow: false,
        message: "",
        type: 0, // 0: info 1:scuess 2: warn 3: error
    };
}
