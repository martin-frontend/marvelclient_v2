import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class PageMyInfoProxy extends puremvc.Proxy {
    static NAME = "PageMyInfoProxy";
    platUsersVerificationProxy = PanelUtil.getProxy_get_platUsersVerificationProxy;

    public onRegister(): void {
        this.pageData.loading = true;
        this.getCurrentCoin();
        this.platUsersVerificationProxy.api_user_var_plat_users_verification_show();
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
        // 当前的主币 奖励币
        platCoins: <any>{
            mainCoin: {},
            rewardCoin: {},
        },
    };
    userInfo: core.UserInfoVO = {};

    pageInit(data: any) {
        Object.assign(this.userInfo, data);
        //console.warn("this.userInfo >>>", this.userInfo);
        const vip_progress = <any>this.userInfo.vip_info?.vip_progress;
        const vip_info = <any>this.userInfo.vip_info;
        const vip_config_info = <any>this.userInfo.vip_config_info;
        if (!vip_info) {
            return;
        }
        if (!vip_info.is_open || vip_info.is_open == 0) {
            return;
        }
        // 等级Max
        this.pageData.vipMaxLevel = vip_info.max_vip_level ? vip_info.max_vip_level : 0;
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
        if (vip_info.max_vip_level) {
            this.pageData.vipNextLevel =
                this.pageData.vipLevel + 1 > vip_info.max_vip_level - 1 ? vip_info.max_vip_level - 1 : this.pageData.vipLevel + 1;
        }
    }
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
