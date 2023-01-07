export default class DialogRealNameProxy extends puremvc.Proxy {
    static NAME = "DialogRealNameProxy";

    pageData = {
        loading: false,
        bShow: false,
        real_name: "",
    };

    setData(data: any) {
        this.pageData.loading = false;
    }

    hide() {
        this.pageData.bShow = false;
    }
}
