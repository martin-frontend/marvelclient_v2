import GameConfig from "@/core/config/GameConfig";

export default class PageHomeProxy extends puremvc.Proxy {
    static NAME = "PageHomeProxy";

    /**参数 */
    parameter: any = {
        from_coin: "CF",
        from_coin_number: 1,
        tolerance: 0,
        user_id: 0,
        plat_id: core.plat_id,
    };

    pageData = {
        loading: false,
        lobbyIndex: <core.PlatLobbyIndexVO[]>[],
        stakeInfo: {
            bonus_pool_amount: "0", // 当前奖池金额
            total_stake_amount: "0", // 总质押数量
            total_bonus_amount: "0", // 总计已派发
            auto_withdraw_stake_time: "0", // 自动解质押时刻
            bonus_time: "0", // 下次分红时间
            coin_name_unique: "", // 质押币种
        },
        trial: {
            to_coin_number: "", // 获取量
            price: "", // 兑换价格
            min_to_coin_number: "", // 最小获取量
            affect_price: "", // 影响价格
            swap_fee: "", // 手续费
        },
    };

    setLobbyIndex(body: any) {
        this.pageData.lobbyIndex = Object.freeze(body.class);
    }

    setStakeInfo(data: any) {
        Object.assign(this.pageData.stakeInfo, data);
    }

    /** 试算*/
    setTrial(data: any) {
        Object.assign(this.pageData.trial, data);
    }

    api_plat_var_stake_info() {
        this.sendNotification(net.HttpType.api_plat_var_stake_info, { plat_id: core.plat_id });
    }

    /**Swap--Swap试算*/
    api_plat_var_swap_trial() {
        this.parameter.plat_id = core.plat_id;
        this.sendNotification(net.HttpType.api_plat_var_swap_trial, this.parameter);
    }
}
