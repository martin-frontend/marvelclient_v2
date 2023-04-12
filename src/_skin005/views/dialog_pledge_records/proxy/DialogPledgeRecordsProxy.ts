import GamePlatConfig from "@/core/config/GamePlatConfig";
import Vue from "vue";

export default class DialogPledgeRecordsProxy extends puremvc.Proxy {
    static NAME = "DialogPledgeRecordsProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        listQuery: {
            cate: 1,
            page_count: 1,
            page_size: 20,
        },
        list: <any>[],
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
        // 列表是否加载完成，手机模式专用
        finished: false,
        done: <any>null,
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

    setTestData() {
        const obj = {
            created_at: "2023-01-06 13:25:06",
            gold: "123",
            coin_b: "123asdasd",
            coin_a_amount: "asdasd",
            coin_b_amount: "asdasd",
            trade_status: 1,
            updated_at: "qweqw",
        };

        const list = <any>[];
        for (let index = 0; index < 10; index++) {
            list.push(obj);
        }

        return list;
    }

    setData(data: any) {
        this.pageData.loading = false;
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.getCurrentCoin();

        if (window.$xsOnly) {
            const { pageCount, pageCurrent } = this.pageData.pageInfo;
            if (pageCurrent == 1) {
                this.pageData.list = data.list;
            } else {
                this.pageData.list.push(...data.list);
            }
            this.pageData.finished = pageCurrent >= pageCount;
            this.pageData.done && this.pageData.done();
        } else {
            this.pageData.list = data.list;
        }
        //this.pageData.list=this.setTestData();
    }

    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_stake_log(this.pageData.listQuery.cate);
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_var_stake_log(this.pageData.listQuery.cate);
    }

    /**--分红--用户质押记录*/
    api_user_var_stake_log(type: any) {
        this.pageData.loading = true;
        const obj = { user_id: core.user_id, type: type }; //1-质押|2-解质押
        Object.assign(obj, this.pageData.listQuery);
        this.sendNotification(net.HttpType.api_user_var_stake_log, obj);
    }
}
