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

    setPlatData(data: any) {
        Object.assign(this.plat_stake_info, data);
    }

    /**--分红--平台币分红信息*/
    api_plat_var_stake_info() {
        this.sendNotification(net.HttpType.api_plat_var_stake_info, { plat_id: core.plat_id });
    }

    /**--分红--平台币分红信息*/
    api_user_var_stake_info() {
        this.sendNotification(net.HttpType.api_user_var_stake_info, { user_id: core.user_id });
    }
}
