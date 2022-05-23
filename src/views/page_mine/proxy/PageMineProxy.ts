export default class PageMineProxy extends puremvc.Proxy {
    static NAME = "PageMineProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
    };
}
