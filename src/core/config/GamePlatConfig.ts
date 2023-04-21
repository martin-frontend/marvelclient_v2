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
