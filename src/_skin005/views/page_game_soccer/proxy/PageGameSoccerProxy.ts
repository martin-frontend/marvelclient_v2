import GameConfig from "@/core/config/GameConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";
import Vue from "vue";

export default class PageGameSoccerProxy extends puremvc.Proxy {
    static NAME = "PageGameSoccerProxy";

    pageData = {
        isAction: false,
        loading: false,
        url: "",
        token: "",
    };

    public onRegister(): void {
        setTimeout(() => {
            console.log("--当前游戏222222", PanelUtil.getProxy_gameproxy.currGame);
            //第一次刷新的时候 当前游戏 id 为 空,则根据当前路由 去请求
            if (!PanelUtil.getProxy_gameproxy.currGame.vendor_id) {
                const curPath = Vue.router.history.current.path;
                if (curPath.includes("cricket")) {
                    PanelUtil.openpage_soccer_cricket();
                } else if (curPath.includes("sports")) {
                    //this.Init(false);
                    PanelUtil.openpage_soccer();
                } else {
                    PanelUtil.openpage_home();
                }
            }
        }, 100);
    }
}
