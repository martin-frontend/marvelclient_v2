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

    /**游戏搜索 */
    navigationData = {
        bShow: false,
        showPage: 1,
        recently: [],
        collection: [],
        searchList: [],
        noSearchGameIcon: require(`@/assets/game/noSearchGameData.png`),
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

    setGameIndex({ recently, collection }: any) {
        if (this.navigationData.showPage == 1) {
            this.navigationData.recently = recently;
        } else if (this.navigationData.showPage == 0) {
            this.navigationData.collection = collection;
        }
    }

    setGameUpdate(body: any) {
        this.api_user_var_game_index();
    }

    setGameSearch(body: any) {
        this.navigationData.searchList = body;
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

    /**--搜索--搜索游戏*/
    api_user_var_game_search(gameName: string) {
        this.sendNotification(net.HttpType.api_user_var_game_search, {
            user_id: core.user_id,
            game_name: gameName,
        });
    }

    /**--搜索--我的游戏*/
    api_user_var_game_index() {
        this.sendNotification(net.HttpType.api_user_var_game_index, {
            user_id: core.user_id,
        });
    }

    /**--搜索--收藏游戏*/
    api_user_var_game_update_var(item: any) {
        this.sendNotification(net.HttpType.api_user_var_game_update_var, {
            user_id: core.user_id,
            vendor_product_id: item.vendor_product_id,
            is_collection: item.is_collection.toString(),
        });
    }

    /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证*/
    api_vendor_var_ori_product_show_var(data: core.VendorVO | core.VendorProductVO) {
        this.pageData.loading = true;
        const { vendor_id, ori_product_id, ori_vendor_extend } = data;
        this.sendNotification(net.HttpType.api_vendor_var_ori_product_show_var, {
            user_id: core.user_id,
            vendor_id,
            ori_product_id,
            ori_vendor_extend,
        });
    }
}
