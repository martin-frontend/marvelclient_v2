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
        from: "CF",
        to: "USDT",
        chartFrom: "CF",
        chartTo: "USDT",
    };

    /** 交换互换*/
    tradeReverse() {
        const target = this.pageData.to;
        this.pageData.to = this.pageData.from;
        this.pageData.from = target;
        if (this.pageData.to != this.pageData.chartTo) {
            this.chartReverse()
        }
    }

    /** Chart互换*/
    chartReverse() {
        const target = this.pageData.chartTo;
        this.pageData.chartTo = this.pageData.chartFrom;
        this.pageData.chartFrom = target;
    }
}
