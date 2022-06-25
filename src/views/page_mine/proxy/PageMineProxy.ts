import GamePlatConfig from "@/core/config/GamePlatConfig";
import getProxy from "@/core/global/getProxy";
import SelfProxy from "@/proxy/SelfProxy";

export default class PageMineProxy extends puremvc.Proxy {
    static NAME = "PageMineProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
        nextExp: 0, //等级还差
        nextUSDT: 0, //,USDT充值
        vipProgress: 0, //vip 进度条
        vipLevel: 0, //目前vip等级
        vipNextLevel: 0, //vip下一等
        vipConfig: [], //vip 所有等级
        vipMaxLevel: 0, //最大等级
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
        console.warn("plat_coins", plat_coins);
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

    pageInit(data: any) {
        Object.assign(this.userInfo, data);
        const vip_progress = <any>this.userInfo.vip_info?.vip_progress;
        const vip_info = <any>this.userInfo.vip_info;
        const vip_config_info = <any>this.userInfo.vip_config_info;
        const backwater_info = <any>this.userInfo.backwater_info;
        // 等级Max
        this.pageData.vipMaxLevel = vip_info.max_vip_level;
        // 流水等级
        if (vip_progress[0]) {
            this.pageData.nextExp = <any>(Number(vip_progress[0].next_vip_level_need_exp) - Number(vip_progress[0].user_exp)).toFixed(2);
        }
        // USDT充值
        if (vip_progress[1]) {
            this.pageData.nextUSDT = <any>(Number(vip_progress[1].next_vip_level_need_exp) - Number(vip_progress[1].user_exp)).toFixed(2);
        }

        // 经验条
        this.pageData.vipProgress =
            ((vip_progress[0].user_exp - vip_progress[0].cur_vip_level_need_exp) /
                (vip_progress[0].next_vip_level_need_exp - vip_progress[0].cur_vip_level_need_exp)) *
            100;
        // 目前vip等级
        this.pageData.vipLevel = vip_info.vip_level;
        this.pageData.vipConfig = vip_config_info?.vip_config;
        this.pageData.vipNextLevel =
            this.pageData.vipLevel + 1 > vip_info.max_vip_level - 1 ? vip_info.max_vip_level - 1 : this.pageData.vipLevel + 1;
        // 主币
        if (backwater_info.backwater_config[2]) {
            this.pageData.backwaterConfigMain.now = backwater_info.backwater_config[2].backwater_rate;
        }
        this.pageData.backwaterConfigMain.next =
            this.pageData.vipLevel == vip_info.max_vip_level
                ? "一"
                : (this.pageData.vipConfig[this.pageData.vipNextLevel - 1]["backwater_config"][2]["backwater_rate"] * 100).toFixed(2);
        // 奖励币
        this.pageData.backwaterConfigReward.now = (backwater_info.backwater_config[3].backwater_rate * 100).toFixed(2);

        this.pageData.backwaterConfigReward.next =
            this.pageData.vipLevel == vip_info.max_vip_level
                ? "一"
                : (this.pageData.vipConfig[this.pageData.vipNextLevel - 1]["backwater_config"][3]["backwater_rate"] * 100).toFixed(2);
    }

    setTrial(body: any) {
        this.getCurrentCoin();

        this.pageData.trial.main = body.total_backwater[this.pageData.platCoins.mainCoin.name];
        this.pageData.trial.mainIconSrc = this.pageData.platCoins.mainCoin.icon;

        this.pageData.trial.reward = body.total_backwater[this.pageData.platCoins.rewardCoin.name];
        this.pageData.trial.rewardIconSrc = this.pageData.platCoins.rewardCoin.icon;
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

    getVipLevel(level: any) {
        return level + 1 > this.pageData.vipMaxLevel ? this.pageData.vipMaxLevel : level + 1;
    }

    getTrialTime(data: any) {
        if (data.url.indexOf("trial") > 0) {
            const result = JSON.parse(data.result);
            const d = result.extend.date.split(" ")[0];
            this.pageData.trial.date = d.split("-")[1] + "-" + d.split("-")[2];
        }
    }
}
