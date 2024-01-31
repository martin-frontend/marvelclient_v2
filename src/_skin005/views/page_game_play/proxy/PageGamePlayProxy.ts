import PanelUtil from "@/_skin005/core/PanelUtil";
import Vue from "vue";

export default class PageGamePlayProxy extends puremvc.Proxy {
    static NAME = "PageGamePlayProxy";

    public onRegister(): void {
        this.pageData.url = localStorage.getItem("game_play_url") || "";
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
