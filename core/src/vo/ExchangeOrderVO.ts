module core {
    export interface ExchangeOrderVO {

        /**用户ID */
        user_id: number;
        /**结算订单号 */
        order_no: string;
        /**扣除金币数 */
        gold: string;
        /**实际到帐数 */
        money: string;
        /**手续费 */
        fee: string;
        /**收款类型 */
        receive_payment_type: string;
        /**状态 */
        status: string;
        /**创建时间 */
        created_at: string;
        /**备注 */
        remark: string;
    }
}