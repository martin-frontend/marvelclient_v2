export default class DialogPersonalCardProxy extends puremvc.Proxy {
    static NAME = "DialogPersonalCardProxy";

    pageData = {
        loading: false,
        bShow: false,
        personalCard: "",
    };

    setData(data: any) {
        this.pageData.loading = false;
    }

    hide() {
        this.pageData.bShow = false;
    }
}
