module core {
    export interface BackWaterTrialVO {
        /**流水 就是結算總額*/
        total_water: string;
        /**返水金额 就是派獎總額*/
        total_backwater: string;
        /**详情*/
        detail: {
            /**產品類型*/
            vendor_type: number;
            /**流水*/
            water: string;
            /**返水比例*/
            backwater_rate: number;
            /**返水金额 就是派獎金額*/
            backwater: string;
            /**產品類型名称*/
            vendor_type_text: string;
        }[];
    }
}
