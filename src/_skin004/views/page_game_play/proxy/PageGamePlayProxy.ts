import Vue from "vue";

export default class PageGamePlayProxy extends puremvc.Proxy {
    static NAME = "PageGamePlayProxy";

    public onRegister(): void {
        setTimeout(() => {
            if (this.pageData.url == "") {
                Vue.router.replace("/");
            }
        }, 500);
    }

    pageData = {
        loading: false,
        url: "",
    };
}
