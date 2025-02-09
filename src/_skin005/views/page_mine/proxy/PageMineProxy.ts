import GamePlatConfig from "@/core/config/GamePlatConfig";
import GlobalVar from "@/core/global/GlobalVar";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class PageMineProxy extends puremvc.Proxy {
    static NAME = "PageMineProxy";
    gameProxy = PanelUtil.getProxy_gameproxy;
    selfProxy = PanelUtil.getProxy_selfproxy;
    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }
    gameRateList = <any>{}; //游戏的汇率
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
        if (data.gold_info && !this.gameProxy.coin_name_unique) {
            this.selfProxy.setUserInfo(data);
        }
        //console.warn("this.userInfo >>>", this.userInfo);
        const vip_progress = <any>this.userInfo.vip_info?.vip_progress;
        const vip_info = <any>this.userInfo.vip_info;
        const vip_config_info = <any>this.userInfo.vip_config_info;
        const backwater_info = <any>this.userInfo.backwater_info;
        if (!vip_info) return;
        // 等级Max
        this.pageData.vipMaxLevel = vip_info.max_vip_level;
        //console.log("最大 等级", vip_info.max_vip_level);
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
        //this.pageData.vipProgress = 85;
        // 目前vip等级
        this.pageData.vipLevel = vip_info.vip_level;
        this.pageData.vipConfig = vip_config_info?.vip_config;
        this.pageData.vipNextLevel =
            this.pageData.vipLevel + 1 > vip_info.max_vip_level - 1 ? vip_info.max_vip_level - 1 : this.pageData.vipLevel + 1;

        if (!backwater_info) return;
        try {
            // 主币
            if (backwater_info.backwater_config[2]) {
                this.pageData.backwaterConfigMain.now = (backwater_info.backwater_config[2].backwater_rate * 10000).toFixed(0);
            }
            this.pageData.backwaterConfigMain.next =
                this.pageData.vipLevel == vip_info.max_vip_level
                    ? "一"
                    : (this.pageData.vipConfig[this.pageData.vipNextLevel - 1]["backwater_config"][2]["backwater_rate"] * 10000).toFixed(0);
            // 奖励币
            this.pageData.backwaterConfigReward.now = (backwater_info.backwater_config[3].backwater_rate * 10000).toFixed(0);

            this.pageData.backwaterConfigReward.next =
                this.pageData.vipLevel == vip_info.max_vip_level
                    ? "一"
                    : (this.pageData.vipConfig[this.pageData.vipNextLevel - 1]["backwater_config"][3]["backwater_rate"] * 10000).toFixed(0);

            // if (!(this.pageData.backwaterConfigReward.now > 0)) {
            //     this.pageData.backwaterConfigReward = JSON.parse(JSON.stringify(this.pageData.backwaterConfigMain));
            //     this.pageData.platCoins.rewardCoin = this.pageData.platCoins.mainCoin;
            //     this.pageData.platCoins.rewardCoin.name = this.pageData.platCoins.mainCoin.name;
            // }
        } catch (error) {
            console.log("error", error);
        }
    }
    setVipConfig(data: any) {
        console.log("--- 设置vip 数据", data);
        this.getCurrentCoin();
        this.pageData.vipConfig = JSON.parse(JSON.stringify(data.vip_config));
        // 等级Max
        this.pageData.vipMaxLevel = data.vip_config.length;
    }
    clearData() {
        Object.assign(this.pageData, {
            nextExp: 0, //等级还差
            nextUSDT: 0, //,USDT充值
            vipProgress: 0, //vip 进度条
            vipLevel: 0, //目前vip等级
            vipNextLevel: 0, //vip下一等
            vipConfig: [], //vip 所有等级
            vipMaxLevel: 0, //最大等级
        });

        Object.assign(this.pageData.backwaterConfigMain, {
            now: 0,
            next: 0,
        });
        Object.assign(this.pageData.backwaterConfigReward, {
            now: 0,
            next: 0,
        });
        Object.assign(this.pageData.totalBackwater, {
            LCC: "0",
            USDT: "0",
        });
        Object.assign(this.pageData.trial, {
            main: "",
            mainIconSrc: "",
            reward: "",
            rewardIconSrc: "",
            date: "",
        });
        Object.assign(this.pageData.platCoins, {
            mainCoin: {},
            rewardCoin: {},
        });
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
        if (!GlobalVar.instance.isNullUser) {
            this.sendNotification(net.HttpType.api_user_var_backwater_trial, {
                user_id: core.user_id,
            });
        }
    }
    /**返水试算领取接口 */
    api_user_var_backwater_trial_receive() {
        if (!GlobalVar.instance.isNullUser) {
            this.sendNotification(net.HttpType.api_user_var_backwater_trial_receive, {
                user_id: core.user_id,
            });
        }
    }

    /**返水试算领取接口 */
    api_plat_var_vip_config() {
        if (GlobalVar.instance.isNullUser) {
            this.sendNotification(net.HttpType.api_plat_var_vip_config, { plat_id: core.plat_id });
        }
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
    /**设置游戏中的 汇率 */
    setCoinsScale(data: any) {
        this.gameRateList = data;
    }
    get getCoinsScale() {
        const { name } = this.pageData.platCoins.mainCoin;

        if (!this.gameRateList || this.gameRateList.length < 1) return -1;

        for (let index = 0; index < this.gameRateList.length; index++) {
            if (this.gameRateList[index].coin_name_unique == name) {
                return 1 / this.gameRateList[index].scale;
            }
        }
        return 0;
    }
    /**--获取币种游戏比率*/
    api_user_var_block_coins_scale() {
        if (!core.user_id) return;
        this.sendNotification(net.HttpType.api_user_var_block_coins_scale, { user_id: core.user_id });
    }
}
