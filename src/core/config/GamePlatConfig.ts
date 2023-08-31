/**
 * 从服务端发过来的配置信息
 */

export default class GamePlatConfig {
    /**一些配置信息 */
    static config: core.GamePlatConfigVO = <any>{
        backwater_info: { is_open: 1 },
        binding_info: { is_open: 1 },
        enum: {
            user_gold_log_type: {},
        },
        gold_transfer_fee: "",
        is_bet_water_display: { is_open: 1 },
        is_bind_phone_award: { is_open: 1 },
        is_bind_phone_exchange: { is_open: 1 },
        is_bind_phone_transfer: { is_open: 1 },
        is_gold_transfer: { is_open: 1 },
        is_password_gold_transfer: { is_open: 1 },
        promotion_info: { is_open: 1 },
        sign_info: { is_open: 0 },
        vip_info: { is_open: 1 },
        plat_coins: <any>{},
        language: <any>{},
        main_language: "",
        validate_type: [],
        is_show_commission: { is_open: 1 },
        is_user_manual_refund: { is_open: 0 },
        plat_display_coins: <any>{},
        is_user_verification: { is_open: 0 },
    };
    /**枚举 */
    static enums: {
        /**金币明细类型 */
        user_gold_log_type: {};
    };

    static init(data: any) {
        this.enums = data.enum;
        delete data.enum;
        Object.assign(this.config, data);
        //将隐藏的币种从中去掉
        if (this.config.plat_coins) {
            const newObj = <any>{};
            const keys = Object.keys(this.config.plat_coins);
            for (let index = 0; index < keys.length; index++) {
                if (this.config.plat_coins[keys[index]] && this.config.plat_coins[keys[index]].is_display == 1) {
                    newObj[keys[index]] = this.config.plat_coins[keys[index]];
                }
            }
            this.config.plat_display_coins = JSON.parse(JSON.stringify(newObj));
            //console.log("修改之后 的币种数据为",this.config.plat_coins);
        }
    }
    /**
     * 查看当前币种是否显示
     * @param coinname
     */
    static isShowCoin(coinname: string): boolean {
        if (!coinname) return false;
        if (this.config.plat_coins && this.config.plat_coins[coinname] && this.config.plat_coins[coinname].is_display == 1) {
            return true;
        }
        return false;
    }
    /**是否为活动币 */
    static isActivityCoin(coinname: string): boolean {
        const coin = this.config.plat_coins[coinname];
        if (coin) {
            return coin.type == 4;
        }
        return false;
    }
    /**主币 */
    static getMainCoin() {
        const coins = this.config.plat_coins;
        const keys = Object.keys(coins);
        for (const key of keys) {
            if (coins[key].type == 2) {
                return key;
            }
        }
        return "";
    }
    /**奖励币 */
    static getAwardCoin() {
        const coins = this.config.plat_coins;
        const keys = Object.keys(coins);
        for (const key of keys) {
            if (coins[key].type == 3) {
                return key;
            }
        }
        return "";
    }

    //获取货币的符号
    static getcoin_symbol(coin_name_unique: string) {
        if (!coin_name_unique) return "";
        if (!this.config.plat_coins[coin_name_unique]) return "";
        return this.config.plat_coins[coin_name_unique].symbol || "";
    }
}
