/**配置信息 */
module core {
    export interface GamePlatConfigVO {
        /**是否显示整盘分红 */
        all_bonus_info: { is_open: number };
        /**是否展示实时返水 */
        backwater_info: { is_open: number };
        /**是否显示注册赠金 */
        binding_info: { is_open: number };
        /**金币划转是否需要手续费 */
        gold_transfer_fee: string;
        /**投注记录是否隐藏流水 */
        is_bet_water_display: { is_open: number };
        /**领取奖励，是否需要先绑定手机 */
        is_bind_phone_award: { is_open: number };
        /**绑定收款地址是否需要手机验证 */
        is_bind_phone_exchange: { is_open: number };
        /**打开充值页面是否需要绑定手机 */
        is_bind_phone_recharge: { is_open: number };
        /**金币划转是否需要手机验证 */
        is_bind_phone_transfer: { is_open: number };
        /**是否展示金币划转 */
        is_gold_transfer: { is_open: number };
        /**是否展示全民推广 */
        promotion_info: { is_open: number };
        /**是否显示签到 */
        sign_info: { is_open: number };
        /**是否展示会员福利 */
        vip_info: { is_open: number };
        /**是否展示现金密码 */
        is_password_gold_transfer: { is_open: number };
        /**返佣设置：1-分类型|2-全部 */
        calc_type: number;
        /**是否需要绑定上级 1 需要 98不需要 */
        is_game_with_parent: { is_open: number };
        /**支持的币种 */
        plat_coins: any;
        /** 显示的币种 */
        plat_display_coins: any;
        /**语言 */
        language: any;
        /**主语言 */
        main_language: string;
        /**可以注册的类型: 1-用户名注册|2-邮箱注册|4-手机注册 */
        register_types: number[];
        /**安全设置:1-邮箱验证|2-短信验证 */
        validate_type: number[];
        /**是否显示推广赚钱: 0-不显示 1-显示 */
        is_show_commission: { is_open: number };
        /**用户手动退款 */
        is_user_manual_refund: { is_open: number };
        /**是否显示用户认证 */
        is_user_verification: { is_open: number };
        /** 简单密码的验证方式 1 为 4位的 图形验证码 2 为滑动验证码*/
        auth_types: number;
        /**注册时否绑定银行卡 */
        is_register_store_bank_info: { is_open: number };
    }
}
