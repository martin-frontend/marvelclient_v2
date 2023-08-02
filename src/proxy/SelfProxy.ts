import AbstractProxy from "@/core/abstract/AbstractProxy";
import GameConfig from "@/core/config/GameConfig";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import getProxy from "@/core/global/getProxy";
import GlobalVar from "@/core/global/GlobalVar";
import router from "@/router";
import GameProxy from "./GameProxy";

export default class SelfProxy extends AbstractProxy {
    static NAME = "SelfProxy";

    private timerCount = 0;

    public onRegister(): void {
        setInterval(() => {
            if (this.timerCount % 10 == 0) {
                if (core.user_id && core.plat_id && GameConfig.config) {
                    this.api_user_show_var([1, 2, 3]);
                    this.api_user_var_red_dot_tips();
                    this.api_user_var_event_record();
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
        is_cash_agent: 0,
        is_exchange: 0,
        is_recharge: 0,
        show_credit_set: 0,
        show_promote: 0,
        invite_user_id: 0,
        vip_info: <any>{},
        water_config: <any>{},
        cpf: "",
        utm_source: "",
    };
    /**红点信息 */
    red_dot_tips = {
        is_activity: 0,
        is_binding: 0,
        is_commission: 0,
        is_today_sign: 0,
        is_user_mail: 0,
        is_vip: 0,
        is_user_mail_num: {
            status: 1, // 状态:1-不提示|2-提示
            num: 0, // 数量
        },
    };
    /**小贴士位置 */
    coinTipData = {
        top: 0,
        left: 0,
        isShow: false,
        width: 0,
    };

    setUserInfo(value: any) {
        Object.assign(this.userInfo, value);
        core.user_id = <any>this.userInfo.user_id;
        if (value && value.extend && value.extend.cpf) {
            this.userInfo.cpf = value.extend.cpf;
        }
        if (value && value.extend && value.extend.utm_source) {
            this.userInfo.utm_source = value.extend.utm_source;
            window.localStorage.setItem("utm_source_" + this.userInfo.user_id, value.extend.utm_source);
        }
        //this.deleteCoin();
        if (value.gold_info) {
            const gameProxy: GameProxy = getProxy(GameProxy);
            //const coin = this.defaultCoin(gameProxy.coin_name_unique);
            let coin = "";
            if (!gameProxy.coin_name_unique) {
                coin = gameProxy.get_coin_from_localstorage();
                coin = this.defaultCoin(coin);
            } else {
                coin = this.defaultCoin(gameProxy.coin_name_unique);
            }
            gameProxy.setCoin(coin);
        }
    }

    defaultCoin(coin: string): string {
        const { plat_coins } = GamePlatConfig.config;

        if (GamePlatConfig.isShowCoin(coin)) return coin;

        //使用 默认的 或者是 金额对多的 将币种排序
        const list = this.userInfo.gold_info;
        //console.log("排序之前的", list);
        //@ts-ignore
        const sortedList = Object.keys(list).sort((a, b) => {
            //@ts-ignore
            const aSumMoney = parseFloat(list[a].sum_money);
            //@ts-ignore
            const bSumMoney = parseFloat(list[b].sum_money);
            return bSumMoney - aSumMoney;
        });

        //console.log("排序之后的结果", sortedList);
        for (let index = 0; index < sortedList.length; index++) {
            const element = sortedList[index];
            if (GamePlatConfig.isShowCoin(element)) return element;
        }

        const coinKeys = Object.keys(plat_coins);
        let result = "";
        for (const iterator of coinKeys) {
            if (plat_coins[iterator] && plat_coins[iterator].is_display == 1) {
                return (result = iterator);
            }
        }
        return result;
    }

    loginout() {
        console.log(">>>>>>>>>>>>>>loginout");
        core.user_id = 0;
        core.token = "";
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

    userVerificationStatus = 0;
    setUserVerificationData(data: any) {
        if (Object.keys(data).length > 0) {
            this.userVerificationStatus = data.status;
        } else {
            this.userVerificationStatus = 0;
        }
    }

    coinTaskData = {
        list: <any>[],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };
    setCoinTaskData(data: any) {
        Object.assign(this.coinTaskData.pageInfo, data.pageInfo);
        this.coinTaskData.list = data.list;
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

    /**--打点相关--获取用户事件记录*/
    api_user_var_event_record() {
        if (!core.user_id) return;
        this.sendNotification(net.HttpType.api_user_var_event_record, { user_id: core.user_id });
    }

    /**--打点相关--更新用户事件记录状态*/
    api_user_var_event_record_update(id: string) {
        if (!core.user_id) return;
        this.sendNotification(net.HttpType.api_user_var_event_record_update, { user_id: core.user_id, bet_id: id });
    }
    api_user_var_notice() {
        if (!core.user_id) return;
        const gameProxy: GameProxy = getProxy(GameProxy);
        this.sendNotification(net.HttpType.api_user_var_notice, {
            user_id: core.user_id,
            plat_id: core.plat_id,
            channel_id: core.channel_id,
            currency: gameProxy.coin_name_unique,
            custom_host: GlobalVar.host_urls,
        });
    }
}
