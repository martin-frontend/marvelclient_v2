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
        other_data: <any>{},
    };

    public onRegister(): void {
        setTimeout(() => {
            console.log("--当前游戏222222", PanelUtil.getProxy_gameproxy.currGame);
            //第一次刷新的时候 当前游戏 id 为 空,则根据当前路由 去请求
            if (!PanelUtil.getProxy_gameproxy.currGame.vendor_id || !this.pageData.isAction) {
                this.refreshGame();
            }
        }, 100);
    }
    refreshGame() {
        // const curPath = Vue.router.history.current.path;
        //@ts-ignore
        const curPath = window.path ? Vue.router.history.current.name : Vue.router.history.current.path;

        //在headgame中搜索 当前路由是否存在 如果存在 则直接 返回 这个对象
        for (let index = 0; index < GameConfig.config.head_game_config.length; index++) {
            const element = GameConfig.config.head_game_config[index];
            if (curPath.includes(element.router_name)) {
                console.log("已经找到headgame的游戏", element);
                element.visitor_allowed = 1;
                PanelUtil.openpage_soccer(element);
                return;
            }
        }

        if (curPath.includes("cricket")) {
            PanelUtil.openpage_soccer_cricket();
        } else if (curPath.includes("page_game_soccer")) {
            //this.Init(false);
            PanelUtil.openpage_soccer();
        } else {
            PanelUtil.openpage_home();
        }
    }
}
