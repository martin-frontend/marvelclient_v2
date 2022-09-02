export default class PageGameListHomeProxy extends puremvc.Proxy {
    static NAME = "PageGameListHomeProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // this.api_plat_var_lobby_index();
        // this.api_plat_var_game_all_config();
    }

    pageData = {
        loading: false,
        list: <any>[],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 51,
            pageSize: 30,
            pageTotal: 1006,
        },
    };

    /**热门游戏 */
    hotGame = {
        category: 0,
        category_name: "",
        list: [],
    };
    /**棋牌游戏*/
    qpGame = {
        category: 0,
        category_name: "",
        list: [],
    };
    /**电子游戏 */
    dzGame = {
        category: 0,
        category_name: "",
        list: [],
    };
    /**体育游戏 */
    sportGame = {
        category: 0,
        category_name: "",
        list: [],
    };
    /**链游 */
    hxGame = {
        category: 0,
        category_name: "",
        list: [],
    };
    /**捕鱼 */
    fishingGame = {
        category: 0,
        category_name: "",
        list: [],
    };
    /**真人 */
    realGame = {
        category: 0,
        category_name: "",
        list: [],
    };
    /**配置 */
    config = {
        loaded: false,
        vendor_type: {},
        vendor_type_vendor_id: {},
    };

    /**查询条件 */
    listQuery = {
        plat_id: core.plat_id,
        vendor_type: 0,
        vendor_id: 0,
        page_count: 1,
        page_size: 30,
    };

    setHotGame(data: any) {
        this.hotGame.category = data.category;
        this.hotGame.category_name = data.category_name;
        this.hotGame.list = Object.freeze(data.list);
    }
    setQpGame(data: any) {
        this.qpGame.category = data.category;
        this.qpGame.category_name = data.category_name;
        this.qpGame.list = Object.freeze(data.list);
    }
    setHXGame(data: any) {
        this.hxGame.category = data.category;
        this.hxGame.category_name = data.category_name;
        this.hxGame.list = Object.freeze(data.list);
    }
    setFishingGame(data: any) {
        this.fishingGame.category = data.category;
        this.fishingGame.category_name = data.category_name;
        this.fishingGame.list = Object.freeze(data.list);
    }
    setRealGame(data: any) {
        this.realGame.category = data.category;
        this.realGame.category_name = data.category_name;
        this.realGame.list = Object.freeze(data.list);
    }
    setSportGame(data: any) {
        this.sportGame.category = data.category;
        this.sportGame.category_name = data.category_name;
        this.sportGame.list = Object.freeze(data.list);
    }
    setDzGame(data: any) {
        this.dzGame.category = data.category;
        this.dzGame.category_name = data.category_name;
        this.dzGame.list = Object.freeze(data.list);
    }

    setConfig(data: any) {
        this.config.loaded = true;
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
