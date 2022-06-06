import GamePlatConfig from "@/core/config/GamePlatConfig";
export default class PageBonusProxy extends puremvc.Proxy {
    static NAME = "PageBonusProxy";

    referenceBonusAmount = 50;

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
    };

    plat_stake_info: any = {
        auto_withdraw_stake_time: "", // 自动解质押时刻
        bonus_pool_amount: "", // 当前奖池金额
        bonus_time: "", // 下次分红倒计时间
        coin_name_unique: "", // 质押币种
        total_bonus_amount: "", // 总计已派发
        total_stake_amount: "", // 总质押数量
        manual_withdraw_stake_fee: "", //手动解除质押手续费
        auto_withdraw_stake_fee: "", // 自动解除质押手续费
        bonus_coin_name_unique: "", // 奖励币种
    };
    user_stake_info: any = {
        amount: "", // 质押币余额
        stake_amount: "", // 个人质押
        stake_ratio: "", // 占比
        stake_bonus_awaiting_num: "", // 可领取分红
        stake_bonus_received_num: "", // 个人累计分红
    };
    bonus_rank: any = [];
    bonus_recently: any = [];
    plat_bonus: any = [];
    user_bonus: any = [];

    setPlatData(data: any) {
        Object.assign(this.plat_stake_info, data);
    }

    setUserData(data: any) {
        Object.assign(this.user_stake_info, data);
    }

    setBonusRank(data: any) {
        this.bonus_rank = data;
    }

    setBonusRecently(data: any) {
        this.bonus_recently = data;
        this.referenceBonusAmount = Math.max(...this.bonus_recently.map((o: { total_bonus_amount: any }) => o.total_bonus_amount));

        for (let i = 0; i < this.bonus_recently.length; i++) {
            if (Number(this.bonus_recently[i].total_bonus_amount) / this.referenceBonusAmount >= 1) {
                this.bonus_recently[i].bar = 1;
            } else {
                this.bonus_recently[i].bar = Number(this.bonus_recently[i].total_bonus_amount) / this.referenceBonusAmount;
            }
        }
    }

    setPlatBonus(data: any) {
        this.plat_bonus = data;
        this.getCurrentCoin();
    }

    setUserBonus(data: any) {
        this.user_bonus = data;
    }

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
        this.sendNotification(net.HttpType.api_plat_var_bonus_rank, { plat_id: core.plat_id });
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
