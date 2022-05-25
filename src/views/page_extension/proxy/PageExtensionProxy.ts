export default class PageExtensionProxy extends puremvc.Proxy {
    static NAME = "PageExtensionProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
    };
}
