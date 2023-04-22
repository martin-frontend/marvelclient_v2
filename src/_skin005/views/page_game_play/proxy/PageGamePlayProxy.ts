import PanelUtil from "@/_skin005/core/PanelUtil";
import Vue from "vue";

export default class PageGamePlayProxy extends puremvc.Proxy {
    static NAME = "PageGamePlayProxy";

    public onRegister(): void {
        setTimeout(() => {
            if (this.pageData.url == "") {
                PanelUtil.openpage_home();
            }
        }, 500);
    }

    pageData = {
        loading: false,
        url: "",
    };
}
