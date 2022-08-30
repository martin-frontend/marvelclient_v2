export default class DialogBonusRankingProxy extends puremvc.Proxy {
    static NAME = "DialogBonusRankingProxy";

    pageData = {
        loading: false,
        bShow: false,
        list: <any>[],
        rank: "",
    };

    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.list = data;
    }

    /**--分红--昨日分红排行榜*/
    api_plat_var_bonus_rank() {
        this.sendNotification(net.HttpType.api_plat_var_bonus_rank, { plat_id: core.plat_id, user_id: core.user_id });
    }
}
