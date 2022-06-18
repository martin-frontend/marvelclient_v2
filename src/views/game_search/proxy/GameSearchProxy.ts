export default class GameSearchProxy extends puremvc.Proxy {
    static NAME = "GameSearchProxy";

    pageData = {
        loading: false,
        bShow: false,
        tabIndex: 0,
        searchString: "", //搜索key
        recently: <any>[], //最近游戏
        collection: <any[]>[], //收藏游戏
        searchList: <any[]>[], //搜索结果
    };

    public setData(data: any): void {
        this.pageData.loading = false;
        this.pageData.recently = data.recently;
        this.pageData.collection = data.collection;
    }

    setSearchResult(data: any) {
        this.pageData.loading = false;
        this.pageData.searchList = data;
    }
    /**切换游戏收藏状态 */
    toggleGame(data: any) {
        data.is_collection = data.is_collection == 1 ? 0 : 1;
        this.api_user_var_game_update_var(data);
        if (data.is_collection == 1) {
            this.pageData.collection.unshift(data);
        } else {
            let len = this.pageData.collection.length;
            for (let i = 0; i < len; i++) {
                const item = this.pageData.collection[i];
                if (item.id == data.id) {
                    this.pageData.collection.splice(i, 1);
                    break;
                }
            }
            len = this.pageData.recently.length;
            for (let i = 0; i < len; i++) {
                const item = this.pageData.recently[i];
                if (item.id == data.id) {
                    item.is_collection = data.is_collection;
                    break;
                }
            }
            len = this.pageData.searchList.length;
            for (let i = 0; i < len; i++) {
                const item = this.pageData.searchList[i];
                if (item.id == data.id) {
                    item.is_collection = data.is_collection;
                    break;
                }
            }
        }
    }

    /**--搜索--搜索游戏*/
    api_user_var_game_search() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_game_search, {
            user_id: core.user_id,
            game_name: this.pageData.searchString,
        });
    }

    /**--搜索--我的游戏*/
    api_user_var_game_index() {
        this.pageData.loading = true;
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
}
