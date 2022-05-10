import AbstractProxy from "@/core/abstract/AbstractProxy";

export default class GameListProxy extends AbstractProxy {
    static NAME = "GameListProxy";

    public onRegister(): void {
        this.api_plat_var_game_all_config();
    }
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

    gameData = {
        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 51,
            pageSize: "20",
            pageTotal: 1006,
        },
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
        const {list, pageInfo} = data;
        if(pageInfo.pageCurrent == 1){
            Object.assign(this.gameData, data);
        }else{
            Object.assign(this.gameData.pageInfo, pageInfo);
            //@ts-ignore
            this.gameData.list.push(...list);
        }
        
    }

    api_plat_var_game_all_config() {
        this.sendNotification(net.HttpType.api_plat_var_game_all_config, { plat_id: core.plat_id });
    }

    api_plat_var_game_all_index() {
        this.sendNotification(net.HttpType.api_plat_var_game_all_index, this.listQuery);
    }
}
