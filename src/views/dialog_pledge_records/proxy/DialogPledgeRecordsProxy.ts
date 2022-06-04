import GamePlatConfig from "@/core/config/GamePlatConfig";
export default class DialogPledgeRecordsProxy extends puremvc.Proxy {
    static NAME = "DialogPledgeRecordsProxy";

    pageData = {
        loading: false,
        bShow: false,
        listQuery: {
            cate: 1,
            page_count: 1,
            page_size: 20,
        },
        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        platCoins: <any>{
            mainCoin: {},
            rewardCoin: {},
        },
    };

    /**取目前的主币 奖励币 */
    getCurrentCoin() {
        const plat_coins = <any>GamePlatConfig.config.plat_coins;
        const coinsKey = Object.keys(plat_coins);
        coinsKey.forEach((key: any) => {
            if (plat_coins[key].type === 2) {
                this.pageData.platCoins.mainCoin = plat_coins[key];
                this.pageData.platCoins.mainCoin.name = key;
                // this.pageData.platCoins.mainCoin[key].name = key;
            }
            if (plat_coins[key].type === 3) {
                this.pageData.platCoins.rewardCoin = plat_coins[key];
                this.pageData.platCoins.rewardCoin.name = key;
                // this.pageData.platCoins.rewardCoin[key].name = key;
            }
        });
    }

    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.pageData.list = data.list;
        this.getCurrentCoin();
    }

    /**--分红--用户质押记录*/
    api_user_var_stake_log(type: any) {
        this.pageData.loading = true;
        const obj = { user_id: core.user_id, type: type }; //1-质押|2-解质押
        Object.assign(obj, this.pageData.listQuery);
        this.sendNotification(net.HttpType.api_user_var_stake_log, obj);
    }
}
