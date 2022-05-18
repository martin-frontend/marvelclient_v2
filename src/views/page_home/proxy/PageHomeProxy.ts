import GameConfig from "@/core/config/GameConfig";

export default class PageHomeProxy extends puremvc.Proxy {
    static NAME = "PageHomeProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        if (GameConfig.config) {
            this.api_plat_var_lobby_index();
        }
    }

    pageData = {
        loading: false,
        lobbyIndex: <core.PlatLobbyIndexVO[]>[],
    };

    setLobbyIndex(body: any) {
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
            this.pageData.lobbyIndex = tmp;
        } else {
            this.pageData.lobbyIndex = body.class;
        }
    }

    /**--大厅--获取游戏类型,游戏菜单（大厅菜单）*/
    api_plat_var_lobby_index() {
        this.sendNotification(net.HttpType.api_plat_var_lobby_index, { plat_id: core.plat_id });
    }
}
