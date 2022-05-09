module core {
    /**
     * 返水记录
     */
    export interface BackWaterVO {
        /**今日已派發獎勵金額 單位: 元*/
        today_total_backwater: number;
        /**昨日已派發獎勵金額 單位: 元*/
        yesterday_total_backwater: number;
        /**一週內已派發獎勵金額 單位: 元*/
        last7days_total_backwater: number;

        list: BackWaterLog[];

        pageInfo: PageInfoVO;
    }

    /**
     * 每条反水记录日志log
     */
    export interface BackWaterLog {
        /**查詳情用的主鍵id*/
        backwater_id: number;
        /**結算流水*/
        total_water: string;
        /**派獎金額*/
        total_backwater: string;
        /**結算日期*/
        created_date: string;
        /**前端顯示用*/
        created_at: string;
    }
}
