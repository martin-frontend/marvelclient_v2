import GamePlatConfig from "@/core/config/GamePlatConfig";

export default class PageMineProxy extends puremvc.Proxy {
    static NAME = "PageMineProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
        this.api_user_var_backwater_trial();
    }

    pageData = {
        loading: false,
        nextExp: 0, //等级还差
        nextUSDT: 0, //,USDT充值
        vipProgress: 0, //vip 进度条
        vipLevel: 0, //目前vip等级
        vipNextLevel: 0,
        vipConfig: [], //vip 所有等级
        //主币
        backwaterConfigMain: <any>{
            now: 0,
            next: 0,
        },
        //奖励币
        backwaterConfigReward: <any>{
            now: 0,
            next: 0,
        },
        //Trial 数据
        totalBackwater: {
            LCC: "0",
            USDT: "0",
        },
        //游戏挖矿
        trial: {
            main: "",
            mainIconSrc: "",
            reward: "",
            rewardIconSrc: "",
            date: "",
        },
        // 当前的主币 奖励币
        platCoins: <any>{
            mainCoin: {},
            rewardCoin: {},
        },
    };

    userInfo: core.UserInfoVO = {};

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

    pageInit(data: any) {
        Object.assign(this.userInfo, data);
        // console.warn("user info >>>", this.userInfo);
        if (this.userInfo.vip_info) {
            const vip_progress = <any>this.userInfo.vip_info?.vip_progress;
            const vip_info = <any>this.userInfo.vip_info;
            const vip_config_info = <any>this.userInfo.vip_config_info;

            this.pageData.nextExp = vip_progress[0].next_vip_level_need_exp - vip_progress[0].user_exp;
            this.pageData.nextUSDT = vip_progress[1].next_vip_level_need_exp - vip_progress[1].user_exp;

            this.pageData.vipProgress = (Number(vip_progress[0].user_exp) / Number(vip_progress[0].next_vip_level_need_exp)) * 100;
            this.pageData.vipLevel = vip_info.vip_level;
            this.pageData.vipConfig = vip_config_info?.vip_config;
            this.pageData.vipNextLevel =
                this.pageData.vipLevel + 1 > vip_info.max_vip_level - 1 ? vip_info.max_vip_level - 1 : this.pageData.vipLevel + 1;
            //主币
            this.pageData.backwaterConfigMain.now = (
                this.pageData.vipConfig[this.pageData.vipLevel]["backwater_config"][2]["backwater_rate"] * 100
            ).toFixed(2);
            this.pageData.backwaterConfigMain.next = (
                this.pageData.vipConfig[this.pageData.vipNextLevel]["backwater_config"][2]["backwater_rate"] * 100
            ).toFixed(2);
            //奖励币
            this.pageData.backwaterConfigReward.now = (
                this.pageData.vipConfig[this.pageData.vipLevel]["backwater_config"][3]["backwater_rate"] * 100
            ).toFixed(2);
            this.pageData.backwaterConfigReward.next = (
                this.pageData.vipConfig[this.pageData.vipNextLevel]["backwater_config"][3]["backwater_rate"] * 100
            ).toFixed(2);
        }
    }

    setTrial(body: any) {
        this.getCurrentCoin();

        this.pageData.trial.main = body.total_backwater[this.pageData.platCoins.mainCoin.name];
        this.pageData.trial.mainIconSrc = this.pageData.platCoins.mainCoin.icon;

        this.pageData.trial.reward = body.total_backwater[this.pageData.platCoins.rewardCoin.name];
        this.pageData.trial.rewardIconSrc = this.pageData.platCoins.rewardCoin.icon;
        this.pageData.trial.date = <any>core.dateFormat(core.getTodayOffset(), "yyyy-MM-dd hh:mm:ss").split(" ")[0];
    }
    /**游戏挖矿 试算 */
    api_user_var_backwater_trial() {
        this.sendNotification(net.HttpType.api_user_var_backwater_trial, {
            user_id: core.user_id,
        });
    }
    /**返水试算领取接口 */
    api_user_var_backwater_trial_receive() {
        this.sendNotification(net.HttpType.api_user_var_backwater_trial_receive, {
            user_id: core.user_id,
        });
    }
}
