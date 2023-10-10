import router from "@/router";

export default class RecentBettingProxy extends puremvc.Proxy {
    static NAME = "RecentBettingProxy";

    public onRegister(): void {
        this.api_plat_var_recently_bet_info();
        setInterval(() => {
            if (router.currentRoute.path == "/" || router.currentRoute.path == "/page_game_play") this.api_plat_var_recently_bet_info();
        }, 30000);
    }
    /**
     * {
            "username": "a****a",              // 玩家
            "game_name": "CQ9电子-测试未通", // 游戏名称
            "win_gold": "$24785.51",           // 盈利
            "bet_gold": "$345.99",             // 投注金额
            "bet_time": "2022-06-08 20:11:06"  // 时间
        }
     */
    pageData = {
        list: <any>[],
        catchList: <any>[],
    };

    public setData(data: any[]): void {
        for (let index = 0; index < data.length; index++) {
            data[index].index = index;
        }
        
        if (this.pageData.list.length == 0) {
            this.pageData.list.push(...data.slice(0, 11));
        }
        this.pageData.catchList = data;
    }

    api_plat_var_recently_bet_info() {
        this.sendNotification(net.HttpType.api_plat_var_recently_bet_info, { plat_id: core.plat_id });
    }
}
