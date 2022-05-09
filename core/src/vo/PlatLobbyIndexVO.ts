module core {

    /**
     * 大厅游戏菜单
     */
    export interface PlatLobbyIndexVO {
        /**大厅分类:1-热门游戏|2-棋牌|4-彩票|8-捕鱼|16-电子|32-真人|64-体育|128-街机|256-老虎机*/
        category: number;
        /** 分类名字 */
        category_name: string;
        list: VendorVO[];
        /** 第几个 */
        index: number;
    }

    /**
     * 厂商产品
     */
    export interface VendorVO {
        /**产品ID*/
        vendor_prodcut_id: number;
        /**标签:1-最新|2-火热*/
        tags: number[];
        /**排序序号*/
        index_no: number;
        /**产品图片*/
        icon: string;
        /**大厅分类:1-热门游戏|2-棋牌|4-彩票|8-捕鱼|16-电子|32-真人|64-体育|128-街机|256-老虎机*/
        category: number;
        /**产品类型:2-棋牌|4-彩票|8-捕鱼|16-电子|32-真人|64-体育|128-街机|256-老虎机*/
        vendor_type: number;
        /**所选产品列表:0-API产品|1-厂商产品列表|2-平台产品列表*/
        list_type: number;
        /**原始产品ID[厂商产品ID]*/
        ori_product_id: string;
        /**厂商ID*/
        vendor_id: number;
        /**产品扩展字段*/
        ori_vendor_extend: string;
        /**产品名称*/
        vendor_product_name: string;
        /**近期是否玩过*/
        recent: boolean;


        app_type: number;
        lobby_model_product_id: number;
        lobby_product_id: number;
        plat_id: number;
        status: number;
        /**厂商名称*/
        vendor_name: string;
        vendor_product_id: number;
    }


}
