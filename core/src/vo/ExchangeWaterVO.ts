module core {
    export interface ExchangeWaterVO {

        id: number;
        data_belong: string;
        /**用户id */
        user_id: number;
        /**平台ID */
        plat_id: number;
        /**入款金额 */
        gold: string;
        /**实际打码 */
        water: string;
        /**审核流水 */
        water_limit: string;
        /**获得金币类型 */
        type: string;
        /**状态 */
        status: string;
        /**创建时间 */
        created_at: string;
        /**更新时间 */
        updated_at: string;
    }
}