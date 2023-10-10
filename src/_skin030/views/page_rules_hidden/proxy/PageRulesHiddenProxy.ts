export default class PageRulesHiddenProxy extends puremvc.Proxy {
    static NAME = "PageRulesHiddenProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
    };
}
