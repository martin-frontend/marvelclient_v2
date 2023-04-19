import router from "@/router";

export default class RecentAwardsProxy extends puremvc.Proxy {
    static NAME = "RecentAwardsProxy";

    public onRegister(): void {
        this.api_plat_var_plat_big_award();
        console.log("RecentAwards_onRegister>>");
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
        this.pageData.list = data;
    }

    api_plat_var_plat_big_award() {
        this.sendNotification(net.HttpType.api_plat_var_plat_big_award, { plat_id: core.plat_id });
    }
}
