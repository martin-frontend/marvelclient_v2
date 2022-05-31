export default class PageBonusProxy extends puremvc.Proxy {
    static NAME = "PageBonusProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
        listQuery: {
            cate: 0,
            page_count: 1,
            page_size: 20,
        },
        listAllSite: [],
        listPerson: [],
        lcusd: require(`@/assets/extension/lcusd.png`),
        coin: require("@/assets/extension/coin.png"),
    };
}
