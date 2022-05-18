export default class PageGameListProxy extends puremvc.Proxy {
    static NAME = "PageGameListProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        this.api_plat_var_lobby_index();
        this.api_plat_var_game_all_config();
    }

    pageData = {
        loading: false,
        list: <any>[],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 51,
            pageSize: 24,
            pageTotal: 1006,
        },
    };

    /**热门游戏 */
    hotGame = {
        category: 0,
        category_name: "",
        list: [],
    };
    /**配置 */
    config = {
        vendor_type: {},
        vendor_type_vendor_id: {},
    };

    /**查询条件 */
    listQuery = {
        plat_id: core.plat_id,
        vendor_type: 0,
        vendor_id: 0,
        page_count: 1,
        page_size: 24,
    };

    setHotGame(data: any) {
        Object.assign(this.hotGame, data);
    }

    setConfig(data: any) {
        Object.assign(this.config, data.all_game);
        this.api_plat_var_game_all_index();
    }

    setGameList(data: any) {
        this.pageData.loading = false;
        const { list, pageInfo } = data;
        if (pageInfo.pageCurrent == 1) {
            Object.assign(this.pageData, data);
        } else {
            Object.assign(this.pageData.pageInfo, pageInfo);
            this.pageData.list.push(...list);
        }
    }

    api_plat_var_lobby_index() {
        this.sendNotification(net.HttpType.api_plat_var_lobby_index, { plat_id: core.plat_id });
    }

    api_plat_var_game_all_config() {
        this.sendNotification(net.HttpType.api_plat_var_game_all_config, { plat_id: core.plat_id });
    }

    api_plat_var_game_all_index() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_plat_var_game_all_index, this.listQuery);
    }
}
