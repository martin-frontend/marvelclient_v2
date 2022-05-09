module core {
    /**
     * 投注记录
     */
    export interface ChannelStatisticVO {
        /**日期*/
        created_date: string;
        /**新增注册*/
        new_register: number;
        /**活跃用户*/
        active_user: number;
        /**充值金额*/
        recharge: string;
        /**充值人数*/
        recharge_user: number;
        /**新增充值人数*/
        new_recharge_user: number;
        /**兑换金额*/
        exchange: string;
        /**总兑换人数*/
        exchange_user: number;
        /**新增兑换人数*/
        new_exchange_user: number;
        /**游戏输赢*/
        win_loss: string;
        /**游戏流水*/
        water: string;
        /**平台赠送*/
        gift_gold: string;
        /**实时返水*/
        backwater_gold: string;
        /**推广返佣*/
        commission_gold: string;
        /**渠道输赢*/
        channel_win_loss: string;
    }
}
