module core {
    /**
     * 账户记录
     */
    export interface AcountLogVO {

        /** id*/
        id: number;
        /**用户id*/
        user_id: number;
        /**平台id*/
        plat_id: number;
        /**类型*/
        type: number;
        /**金币变化前的值*/
        gold_before: string;
        /**金币变化的值*/
        gold: string;
        /**创建人*/
        created_by: string;
        /**创建时间*/
        created_at: string;
        /**金币变化后的值*/
        balance: string;
        /**備註 */
        remark: string;
    }
}
