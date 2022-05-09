module core {
    /**
     * 厂商产品
     */
    export interface VendorProductVO {
        /**游戏名称*/
        vendor_product_name: string;
        /**厂商ID*/
        vendor_id: number;
        /**游戏图片地址*/
        icon: string;
        /**游戏扩展字段*/
        ori_vendor_extend:string;
        /**厂商产品id*/
        ori_product_id:string;
        /**是否喜欢*/
        love:boolean;
        /**近期是否玩过*/
        recent:boolean;
        /**游戏横竖屏，1横屏，2竖屏 */
        orientation: number;
    }
}
