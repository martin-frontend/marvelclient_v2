import AbstractProxy from "@/core/abstract/AbstractProxy";
import GameConfig from "@/core/config/GameConfig";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import getProxy from "@/core/global/getProxy";
import GlobalVar from "@/core/global/GlobalVar";
import router from "@/router";
import PixelEvenManager from "@/_skin005/core/PixelEvenManager";
import GameProxy from "./GameProxy";

export default class SelfProxy extends AbstractProxy {
    static NAME = "SelfProxy";

    private timerCount = 0;

    public onRegister(): void {
        setInterval(() => {
            if (this.timerCount % 10 == 0) {
                if (core.user_id && core.plat_id && GameConfig.config) {
                    this.api_user_show_var([2,3]);
                    this.api_user_var_red_dot_tips();
                }
            }
            GlobalVar.server_time++;
            this.timerCount++;
        }, 1000);
    }

    /**用户个人信息 */
    userInfo: core.UserInfoVO = {
        user_id: 0,
        nick_name: "",
        phone: "",
        email: "",
        real_name: "",
        real_name_decrypt: "",
        password_gold_exists: 0,
        bsc_address: "",
        gold_info: <any>{},
        is_gold_transfer: 0,
        business_card: "",
        invite_user_business_card: "",
        is_show_agent_statistic: 0,
        is_google_scan: 0,
        is_login_need_google: 0,
        show_credit_statistic: 0,
        is_gold_exchange: 0,
        is_credit_user: 0,
        is_exchange: 0,
        is_recharge: 0,
        show_credit_set: 0,
        show_promote: 0,
        invite_user_id: 0,
        vip_info:<any>{},
        water_config:<any>{},
    };
    /**红点信息 */
    red_dot_tips = {
        is_activity: 0,
        is_binding: 0,
        is_commission: 0,
        is_today_sign: 0,
        is_user_mail: 0,
        is_vip: 0,
        is_user_mail_num:{
            status: 1,  // 状态:1-不提示|2-提示
            num: 0       // 数量
        }
    };

    setUserInfo(value: any) {
        if (!this.userInfo.user_id)
        {
            PixelEvenManager.Instance.onLoginSuccess();
        }
        Object.assign(this.userInfo, value);
        core.user_id = <any>this.userInfo.user_id;

        if (value.gold_info) {
            const gameProxy: GameProxy = getProxy(GameProxy);
            const coin = this.defaultCoin(gameProxy.coin_name_unique);
            gameProxy.setCoin(coin);
        }
    }

    defaultCoin(coin: string): string {
        const { plat_coins } = GamePlatConfig.config;

        if (plat_coins[coin]?.is_display == 1) {
            return coin;
        }

        const coinKeys = Object.keys(plat_coins);
        let result = "";
        for (const iterator of coinKeys) {
            if (plat_coins[iterator].is_display == 1) {
                return result = iterator;
            }
        }
        return result;
    }

    loginout() {
        core.user_id = 0;
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user_id");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("coin_name_unique");
        this.userInfo.user_id = 0;
        router.push("/");
    }

    redDotTips(data: any) {
        Object.assign(this.red_dot_tips, data);
    }

    /**--账号--登出*/
    api_user_logout() {
        this.sendNotification(net.HttpType.api_user_logout);
    }
    /**--会员资料--获取用户基本信息*/
    api_user_show_var(modules: number[]) {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_show_var, { user_id: core.user_id, modules: JSON.stringify(modules) });
        }
    }
    api_plat_var_game_config() {
        //获取平台配置信息
        this.sendNotification(net.HttpType.api_plat_var_game_config, { plat_id: core.plat_id });
    }
    /**--会员资料--修改用户基本信息*/
    api_user_update_var(data: any) {
        this.sendNotification(net.HttpType.api_user_update_var, {
            ...data,
            user_id: core.user_id,
        });
    }
    /**--其它--获取红点提示信息*/
    api_user_var_red_dot_tips() {
        this.sendNotification(net.HttpType.api_user_var_red_dot_tips, { user_id: core.user_id });
    }
}
