export default class PageBonusProxy extends puremvc.Proxy {
    static NAME = "PageBonusProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
    };
}
