module core {
    export interface ExchangePaymentVO {

        id: number;
        /**用户ID */
        user_id: number;
        /**收款类型 1-银行卡|2-支付宝 */
        type: number;
        /**使用状态 */
        status: number;
        payment_method: {
            /**银行卡号 */
            account: string;
            /**持卡人姓名 */
            account_name: string;
            /**所属银行 */
            bank: string;
            /**开户支行 */
            account_bank: string;
        }
        /** */
        created_at: string;
        /** */
        updated_at: string;
    }
}