export default class IntroduceProxy extends puremvc.Proxy {
    static NAME = "IntroduceProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
    };

    pageImage = {
        cat: require("@/assets/introduce/CAT@3x.a57017f7.png"),
    };
}
