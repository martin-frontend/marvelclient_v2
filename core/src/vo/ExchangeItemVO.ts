module core {
    export interface ExchangeItemVO {

        id?: number;
        /**平台ID */
        plat_id?: number;
        /**平台兑换配置ID */
        exchange_channel_id?: number;
        /**兑换收款类型 */
        payment_method_type?: number;
        /**汇率 */
        coin_rate?: number;
        /**描述信息 */
        subtitle?: string;
        /**兑换收款类型说明 */
        explain?: string;
        /**最低保留余额 */
        balance?: string;
    }
}
