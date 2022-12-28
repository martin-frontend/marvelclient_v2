export default class HeaderMobileProxy extends puremvc.Proxy {
    static NAME = "HeaderMobileProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
    };
}
