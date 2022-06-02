export default class PageBonusProxy extends puremvc.Proxy {
    static NAME = "PageBonusProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
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
        lcusd: require(`@/assets/extension/lcusd.png`),
        coin: require("@/assets/extension/coin.png"),
    };

    plat_stake_info: any = {
        auto_withdraw_stake_time: "",   // 自动解质押时刻
        bonus_pool_amount: "",          // 当前奖池金额
        bonus_time: "",                 // 下次分红倒计时间
        coin_name_unique: "",           // 质押币种
        total_bonus_amount: "",         // 总计已派发
        total_stake_amount: "",         // 总质押数量
    };
    user_stake_info: any = {
        amount: "",                    // 质押币余额
        stake_amount: "",              // 个人质押
        stake_ratio: "",               // 占比
        stake_bonus_awaiting_num: "",  // 可领取分红
        stake_bonus_received_num: ""   // 个人累计分红
    }
    bonus_rank: any = [];
    bonus_recently: any = [];

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
        console.log(this.bonus_recently);
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
}
