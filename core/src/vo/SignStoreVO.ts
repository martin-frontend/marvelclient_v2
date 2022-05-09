module core {
    /**
     * 每日签到
     */
    export interface SignStoreVO {
        /**是否已完成:0-否|1-是*/
        complete: number;
        /**是否已完成:0-否|1-是*/
        receive: number;
        list: {
            /**独立规则-参数值*/
            params: string;
            /**独立规则-参数名称*/
            params_name: string;
            /**独立规则-派奖类型:1-金币|2-积分*/
            award_type: number;
            /**奖励就IDS*/
            award_ids: number[];
        }[];
    }
}
