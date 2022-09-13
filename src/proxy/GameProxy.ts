import AbstractProxy from "@/core/abstract/AbstractProxy";
import GameConfig from "@/core/config/GameConfig";

export default class GameProxy extends AbstractProxy {
    static NAME = "GameProxy";

    public onRegister(): void {
        this.coin_name_unique = window.localStorage.getItem("coin_name_unique") || "";
    }

    /**大厅菜单 */
    lobbyIndex: core.PlatLobbyIndexVO[] = [];
    /**当前正在玩的游戏 */
    currGame: any;
    /**当前选择的钱包类型 */
    coin_name_unique: string = "";
    // /**进入游戏页面的上一个路由 */
    // lastRouter = "";
    // /**游戏跳转前，历史页面数量 */
    // historyLength = 0;
    /**游戏跳转前，页面的状态 */
    gamePreData = {
        lastRouter: "",
        historyLength: 0,
        scrollY: 0,
    };

    loading = false;

    /**
     * 大厅菜单
     */
    setLobbyIndex(body: any) {
        this.lobbyIndex = body.class;
    }

    setCoin(coin_name_unique: string) {
        window.localStorage.setItem("coin_name_unique", coin_name_unique);
        this.coin_name_unique = coin_name_unique;
    }

    /**--大厅--获取游戏类型,游戏菜单（大厅菜单）*/
    api_plat_var_lobby_index() {
        this.sendNotification(net.HttpType.api_plat_var_lobby_index, { plat_id: core.plat_id });
    }

    /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证*/
    api_vendor_var_ori_product_show_var(data: core.VendorVO | core.VendorProductVO) {
        this.loading = true;
        this.currGame = data;
        const { vendor_id, ori_product_id, ori_vendor_extend } = data;
        this.sendNotification(net.HttpType.api_vendor_var_ori_product_show_var, {
            user_id: core.user_id,
            vendor_id,
            ori_product_id,
            ori_vendor_extend,
            coin_name_unique: this.coin_name_unique,
        });
    }
}
