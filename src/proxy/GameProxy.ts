import GameConfig from "@/core/config/GameConfig";

export default class GameProxy extends puremvc.Proxy {
    static NAME = "GameProxy";
    /**大厅菜单 */
    lobbyIndex: core.PlatLobbyIndexVO[] = [];
    /**大厅当前选择的分类 */
    lobbySelect: core.PlatLobbyIndexVO = {
        category: 1,
        category_name: "",
        list: [],
        index: 0,
    };
    /**厂商产品 */
    vendorProduct: core.VendorProductVO[] = [];

    /**游戏分类图标 */
    categoryIcon = {
        1: "mdi-fire",
        2: "mdi-cards-playing",
        4: "mdi-cards-playing",
        8: "mdi-cards-playing",
        16: "mdi-cards-playing",
        32: "mdi-cards-playing",
        64: "mdi-cards-playing",
        128: "mdi-cards-playing",
        256: "mdi-cards-playing",
        512: "mdi-cards-playing",
    };

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
            this.lobbyIndex.push(...tmp);
        } else {
            this.lobbyIndex.push(...body.class);
        }
        this.setLobbySelect(this.lobbyIndex[0].category);
    }
    /**设置当前大厅分类 */
    setLobbySelect(category: number) {
        const c = this.lobbyIndex.find((item) => item.category == category);
        Object.assign(this.lobbySelect, c);
        this.vendorProduct = [];
    }
    /**厂商游戏 */
    setVendorProduct(data: core.VendorProductVO[]) {
        this.vendorProduct = data;
    }

    /**--大厅--获取游戏类型,游戏菜单（大厅菜单）*/
    api_plat_var_lobby_index() {
        this.sendNotification(net.HttpType.api_plat_var_lobby_index, { plat_id: core.plat_id });
    }
    /**--大厅--获取厂商列表*/
    api_vendor_simple() {
        this.sendNotification(net.HttpType.api_vendor_simple);
    }
    /**--大厅--获取厂商配置游戏菜单（大厅厂商二级游戏菜单）*/
    api_vendor_var_lobby_simple(data: core.VendorVO) {
        this.vendorProduct = [];
        const { vendor_id, list_type, vendor_type } = data;
        this.sendNotification(net.HttpType.api_vendor_var_lobby_simple, { vendor_id, list_type, vendor_type });
    }
    /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证*/
    api_vendor_var_ori_product_show_var(data: core.VendorVO | core.VendorProductVO) {
        const { vendor_id, ori_product_id, ori_vendor_extend } = data;
        this.sendNotification(net.HttpType.api_vendor_var_ori_product_show_var, {
            user_id: core.user_id,
            vendor_id,
            ori_product_id,
            ori_vendor_extend,
        });
    }
}
