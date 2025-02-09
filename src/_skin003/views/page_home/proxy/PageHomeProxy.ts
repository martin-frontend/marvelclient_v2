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
            apr: "",
        },
        swap_setting_info: {
            coin_a: "CF", // 币A
            coin_b: "USDT", // 币B
            coin_a_b_price: "",
            coin_b_a_price: "0", // USDT计价
        },
        swap_k: {
            coin_a_b_changed: "", // 币种A兑币种B变化
        },
        backwater_setting_info: {
            backwater_max_efficiency: "0", // 平台最大挖矿效率
        },
        event_id: 0, //进入时直接进入内页
    };

    setLobbyIndex(body: any) {
        this.pageData.lobbyIndex = Object.freeze(body.class);
    }

    setStakeInfo(data: any) {
        Object.assign(this.pageData.stakeInfo, data);
    }

    setInfo(data: any) {
        Object.assign(this.pageData.swap_setting_info, data);
    }

    setSwapK(data: any) {
        Object.assign(this.pageData.swap_k, data);
    }

    setbackwater(data: any) {
        Object.assign(this.pageData.backwater_setting_info, data);
    }

    api_plat_var_stake_info() {
        this.sendNotification(net.HttpType.api_plat_var_stake_info, { plat_id: core.plat_id });
    }

    /**Swap--Swap基础信息*/
    api_plat_var_swap_setting_info() {
        this.sendNotification(net.HttpType.api_plat_var_swap_setting_info, { plat_id: core.plat_id });
    }

    /**Swap--Swap价格图*/
    api_plat_var_swap_k() {
        this.sendNotification(net.HttpType.api_plat_var_swap_k, {
            plat_id: core.plat_id,
            type: 1,
        });
    }

    /**获取平台最大挖矿效率*/
    api_plat_var_backwater_setting_info() {
        this.sendNotification(net.HttpType.api_plat_var_backwater_setting_info, {
            plat_id: core.plat_id,
        });
    }
}
