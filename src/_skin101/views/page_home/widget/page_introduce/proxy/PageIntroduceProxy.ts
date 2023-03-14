export default class PageIntroduceProxy extends puremvc.Proxy {
    static NAME = "PageIntroduceProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
        reward_coin_info: {
            coin_name: "", // Token名称
            contract_address: "", // 合约地址
            block_network_name: "", // 发行链
            total_supply: "", // 总计发行
            total_circulate: "", // 总计流通
            total_stake_amount: "", // 总计质押
            total_holder: "", // 持币地址数
        },
        stake_info: {
            bonus_pool_amount: "0", // 当前奖池金额
            yesterday_total_bonus_amount: "0", // 总质押数量
            total_stake_amount: "0", // 总质押数量
            total_bonus_amount: "0", // 总计已派发
            auto_withdraw_stake_time: "0", // 自动解质押时刻
            bonus_time: "0", // 下次分红时间
            coin_name_unique: "", // 质押币种
        },
    };

    setRewardCoinInfo(data: any) {
        Object.assign(this.pageData.reward_coin_info, data);
    }

    setStakeInfo(data: any) {
        Object.assign(this.pageData.stake_info, data);
    }
    pageImage = {
        cat: require("@/assets/introduce/CAT@3x.png"),
        coin: require("@/assets/introduce/coin.png"),
        joystick: require("@/assets/introduce/joystick.png"),
        money: require("@/assets/introduce/money.png"),
        stuck: require("@/assets/introduce/stuck.png"),
        wheel: require("@/assets/introduce/wheel.png"),
        line1: require("@/assets/introduce/line1.png"),
        line2: require("@/assets/introduce/line2.png"),
        flammingM: require("@/assets/introduce/FlammingM.png"),
        flammingP: require("@/assets/introduce/FlammingP.png"),
        intBg01M: require("@/assets/introduce/01M.png"),
        intBg02M: require("@/assets/introduce/02M.png"),
        intBg03M: require("@/assets/introduce/03M.png"),
        intBg01P: require("@/assets/introduce/01P.png"),
        intBg02P: require("@/assets/introduce/02P.png"),
        intBg03P: require("@/assets/introduce/03P.png"),
        externalLink: require("@/assets/introduce/External-link.png"),
        tickAble: require("@/assets/introduce/Tick-Able.svg"),
        tickDisable: require("@/assets/introduce/Tick-Disable.svg"),
    };

    api_plat_var_reward_coin_info() {
        this.sendNotification(net.HttpType.api_plat_var_reward_coin_info, { plat_id: core.plat_id });
    }

    api_plat_var_stake_info() {
        this.sendNotification(net.HttpType.api_plat_var_stake_info, { plat_id: core.plat_id });
    }
}
