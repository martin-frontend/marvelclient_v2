export default class PageSwapProxy extends puremvc.Proxy {
    static NAME = "PageSwapProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
        cf: "",
        usdt: "",
        icon: "mdi-arrow-down",
    };
}
