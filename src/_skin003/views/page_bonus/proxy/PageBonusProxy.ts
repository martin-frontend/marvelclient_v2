import GamePlatConfig from "@/core/config/GamePlatConfig";
export default class PageBonusProxy extends puremvc.Proxy {
    static NAME = "PageBonusProxy";

    public onRegister(): void {
        this.pageData.loading = true;
    }

    pageData = {
        loading: false,
        listQuery: {
            cate: 0,
            page_count: 1,
            page_size: 20,
        },
        listAllSite: [],
        listPerson: [],
        platCoins: <any>{
            mainCoin: {},
            rewardCoin: {},
        },
        plat_stake_info: <any>{
            auto_withdraw_stake_time: "", // 自动解质押时刻
            bonus_pool_amount: "", // 当前奖池金额
            bonus_time: "", // 下次分红倒计时间
            coin_name_unique: "", // 质押币种
            total_bonus_amount: "", // 总计已派发
            total_stake_amount: "", // 总质押数量
            manual_withdraw_stake_fee: "", //手动解除质押手续费
            auto_withdraw_stake_fee: "", // 自动解除质押手续费
            bonus_coin_name_unique: "", // 奖励币种
        },
        user_stake_info: <any>{
            amount: "", // 质押币余额
            stake_amount: "", // 个人质押
            stake_ratio: "", // 占比
            stake_bonus_awaiting_num: "", // 可领取分红
            stake_bonus_received_num: "", // 个人累计分红
        },
        bonus_rank: <any>[], //排行榜
        rank: "", //排名
        bonus_recently: <any>[],
        plat_bonus: <any>{
            list: [],
        },
        user_bonus: <any>{
            list: [],
        },
        referenceBonusAmount: 50,
    };

    setPlatData(data: any) {
        Object.assign(this.pageData.plat_stake_info, data);
    }

    setUserData(data: any) {
        Object.assign(this.pageData.user_stake_info, data);
    }
    setTestData()
    {
        const obj = {
            username:"asdasd",
            stake_amount:"asdasd",
            bonus_amount:"asdasd",
        };

        const list=<any>[];
        for (let index = 0; index < 10; index++) {
            
            list.push(obj);
        }
        return list;
    }
    setBonusRank(data: any) {
        this.pageData.bonus_rank = data.list;
        this.pageData.rank = data.rank;

        // this.pageData.bonus_rank = this.setTestData();
        // this.pageData.rank = "1";
    }

    setBonusRecently(data: any) {
        this.pageData.bonus_recently = data;
        this.pageData.referenceBonusAmount = Math.max(
            ...this.pageData.bonus_recently.map((o: { total_bonus_amount: any }) => o.total_bonus_amount)
        );
        for (let i = 0; i < this.pageData.bonus_recently.length; i++) {
            if (Number(this.pageData.bonus_recently[i].total_bonus_amount) / this.pageData.referenceBonusAmount >= 1) {
                this.pageData.bonus_recently[i].bar = 1;
            } else {
                this.pageData.bonus_recently[i].bar =
                    Number(this.pageData.bonus_recently[i].total_bonus_amount) / this.pageData.referenceBonusAmount;
            }
        }
    }

    setPlatBonus(data: any) {
        this.pageData.plat_bonus.list = data.list.slice(0, 10);
        this.getCurrentCoin();
    }

    setUserBonus(data: any) {
        this.pageData.user_bonus.list = data.list.slice(0, 10);
    }

    /**取目前的主币 奖励币 */
    getCurrentCoin() {
        const plat_coins = <any>GamePlatConfig.config.plat_coins;
        const coinsKey = Object.keys(plat_coins);
        coinsKey.forEach((key: any) => {
            if (plat_coins[key].type === 2) {
                this.pageData.platCoins.mainCoin = plat_coins[key];
                this.pageData.platCoins.mainCoin.name = key;
            }
            if (plat_coins[key].type === 3) {
                this.pageData.platCoins.rewardCoin = plat_coins[key];
                this.pageData.platCoins.rewardCoin.name = key;
            }
        });
    }

    /**--分红--平台币分红信息*/
    api_plat_var_stake_info() {
        this.sendNotification(net.HttpType.api_plat_var_stake_info, { plat_id: core.plat_id });
    }

    /**--分红--平台币分红信息*/
    api_user_var_stake_info() {
        this.sendNotification(net.HttpType.api_user_var_stake_info, { user_id: core.user_id });
    }

    /**--分红--平台近5日分红金额列表*/
    api_plat_var_bonus_recently() {
        this.sendNotification(net.HttpType.api_plat_var_bonus_recently, { plat_id: core.plat_id });
    }

    /**--分红--昨日分红排行榜*/
    api_plat_var_bonus_rank() {
        this.sendNotification(net.HttpType.api_plat_var_bonus_rank, { plat_id: core.plat_id, user_id: core.user_id });
    }

    /**--分红--领取分红*/
    api_user_var_stake_draw() {
        this.sendNotification(net.HttpType.api_user_var_stake_draw, { user_id: core.user_id });
    }

    /**--分红--用户质押记录*/
    api_user_var_stake_log() {
        this.sendNotification(net.HttpType.api_user_var_stake_log, { user_id: core.user_id });
    }

    /**--分红--分红记录-全站记录*/
    api_plat_var_bonus_log() {
        this.sendNotification(net.HttpType.api_plat_var_bonus_log, { plat_id: core.plat_id });
    }

    /**--分红--分红记录-个人纪录*/
    api_user_var_bonus_log() {
        this.sendNotification(net.HttpType.api_user_var_bonus_log, { user_id: core.user_id });
    }
}
