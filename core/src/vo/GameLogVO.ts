module core {
    /**
     * 投注记录
     */
    export interface GameLogVO {
        /**用户投注明细ID*/
        bet_id: number;
        /**用户id*/
        user_id: number;
        /**平台id*/
        plat_id: number;
        /**厂商id*/
        vendor_id: number;
        /**厂商类型*/
        vendor_type: number;
        /**厂商名称*/
        vendor_product_name: string;
        /**输赢*/
        win_gold: string;
        /**订单号*/
        order_no: string;
        /**下注金额*/
        bet_gold: string;
        /**下注时间*/
        bet_at: string;
        /**结算状态:1-未结算|11-已结算*/
        settlement_status: number;
        /**厂商名称*/
        vendor_name: string;
        /**厂商logo*/
        vendor_icon: string;
        /**流水*/
        water: string;
        /**是否已结算反水:0-未结算|1-已结算*/
        is_settlement_backwater: number;
        /**返水金额*/
        backwater: string;
    }
}
