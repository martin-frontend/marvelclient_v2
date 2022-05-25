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
        recently: [
            {
                id: 2714152,
                is_collection: 0,
                updated_at: "2022-05-03 11:06:57",
                vendor_product_id: 5628,
                vendor_product_name: "\u70b8\u91d1\u82b1",
                vendor_id: 97,
                vendor_type: 2,
                icon: require(`@/assets/game/designGameIcon.png`),
                ori_vendor_extend: "{}",
                ori_product_id: "101",
                status: 1,
                orientation: 1,
                vendor_name: "GPQP",
            },
            {
                id: 2714151,
                is_collection: 0,
                updated_at: "2022-05-03 11:04:49",
                vendor_product_id: 5680,
                vendor_product_name: "21\u70b9",
                vendor_id: 102,
                vendor_type: 2,
                icon: require(`@/assets/game/designGameIcon.png`),
                ori_vendor_extend: "{}",
                ori_product_id: "600",
                status: 1,
                orientation: 1,
                vendor_name: "KYQP",
            },
            {
                id: 2714150,
                is_collection: 0,
                updated_at: "2022-05-03 11:04:06",
                vendor_product_id: 5771,
                vendor_product_name: "21\u70b9",
                vendor_id: 104,
                vendor_type: 2,
                icon: require(`@/assets/game/designGameIcon.png`),
                ori_vendor_extend: "{}",
                ori_product_id: "600",
                status: 1,
                orientation: 1,
                vendor_name: "NWGQP",
            },
        ],
        collection: [
            {
                id: 2714344,
                is_collection: 1,
                updated_at: "2022-05-23 14:07:13",
                vendor_product_id: 5773,
                vendor_product_name: "\u70b8\u91d1\u82b1",
                vendor_id: 104,
                vendor_type: 2,
                icon: require(`@/assets/game/designGameIcon.png`),
                ori_vendor_extend: "{}",
                ori_product_id: "220",
                status: 1,
                orientation: 1,
                vendor_name: "NWGQP",
            },
            {
                id: 2714152,
                is_collection: 1,
                updated_at: "2022-05-03 11:06:57",
                vendor_product_id: 5628,
                vendor_product_name: "\u70b8\u91d1\u82b1",
                vendor_id: 97,
                vendor_type: 2,
                icon: require(`@/assets/game/designGameIcon.png`),
                ori_vendor_extend: "{}",
                ori_product_id: "101",
                status: 1,
                orientation: 1,
                vendor_name: "GPQP",
            },
            {
                id: 2714151,
                is_collection: 1,
                updated_at: "2022-05-03 11:04:49",
                vendor_product_id: 5680,
                vendor_product_name: "21\u70b9",
                vendor_id: 102,
                vendor_type: 2,
                icon: require(`@/assets/game/designGameIcon.png`),
                ori_vendor_extend: "{}",
                ori_product_id: "600",
                status: 1,
                orientation: 1,
                vendor_name: "KYQP",
            },
        ],
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
