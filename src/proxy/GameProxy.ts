import AbstractProxy from "@/core/abstract/AbstractProxy";
import GameConfig from "@/core/config/GameConfig";
import Cookies from "js-cookie";

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
    /**上一个页面 */
    lastRouter = "/";

    loading = false;
    /**跑马灯 */
    marqueeIndex: any = [];

    /**
     * 大厅菜单
     */
    setLobbyIndex(body: any) {
        this.lobbyIndex.length = 0;
        const category_order = GameConfig.config && GameConfig.config.category_order;

        if (category_order && category_order.length > 0) {
            const tmp: core.PlatLobbyIndexVO[] = [];

            while (category_order.length > 0) {
                const cat = category_order.shift();
                const item = body.class.find((element: any) => element.category == cat);
                if (item) {
                    tmp.push(item);
                    body.class.splice(body.class.indexOf(item), 1);
                }
            }
            tmp.push(...body.class);
            this.lobbyIndex = tmp;
        } else {
            this.lobbyIndex = body.class;
        }
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
            coin_name_unique: this.coin_name_unique
        });
    }

    /**跑马灯 */
    setMarqueeIndex(data: any) {
        this.marqueeIndex = data;
    }
}
