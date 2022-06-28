import GameConfig from "@/core/config/GameConfig";

export default class PageHomeProxy extends puremvc.Proxy {
    static NAME = "PageHomeProxy";

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
    };

    setLobbyIndex(body: any) {
        this.pageData.lobbyIndex = Object.freeze(body.class);
    }

    setStakeInfo(data: any) {
        Object.assign(this.pageData.stakeInfo, data);
    }

    api_plat_var_stake_info() {
        this.sendNotification(net.HttpType.api_plat_var_stake_info, { plat_id: core.plat_id });
    }
}
