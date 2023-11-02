export default class DialogGameRateProxy extends puremvc.Proxy {
    static NAME = "DialogGameRateProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        list: <any>[],
    };

    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.list = data;
    }

    /**--获取币种游戏比率*/
    api_user_var_block_coins_scale() {
        this.sendNotification(net.HttpType.api_user_var_block_coins_scale, { user_id: core.user_id });
    }
}
