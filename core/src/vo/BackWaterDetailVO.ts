module core {
    /**
     * 返水详情
     */
    export interface BackWaterDetailVO {
        backwater_id: number;
        /**結算總額*/
        total_water: string;
        /**派獎總額*/
        total_backwater: string;
        /**結算日期*/
        created_date: string;
        /**创建时间*/
        created_at: string;
        /**反水详情记录log */
        detail: BackWaterDetailLog[];
    }

    /**
     * 每条反水详情记录log
     */
    export interface BackWaterDetailLog {
        /**產品類型*/
        vendor_type: number;
        /**流水*/
        water: string;
        /**返水比例*/
        backwater_rate: number;
        /**返水金额 就是派獎金額*/
        backwater: string;
        /**類型名*/
        vendor_type_text: string;
    }
}
