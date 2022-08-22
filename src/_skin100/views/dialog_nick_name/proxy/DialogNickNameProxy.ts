export default class DialogNickNameProxy extends puremvc.Proxy {
    static NAME = "DialogNickNameProxy";

    pageData = {
        loading: false,
        bShow: false,
        nickname: "",
    };

    setData(data: any) {
        this.pageData.loading = false;
    }

    hide() {
        this.pageData.bShow = false;
    }
}
