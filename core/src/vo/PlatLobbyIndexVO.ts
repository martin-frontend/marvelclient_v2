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
        //game_menu
        vendor_type: number; //厂商游戏类型
        vendor_type_name: string;
    }
    /**
     * 大厅游戏菜单--分类
     */
    export interface PlatLobbyCategoryIndexVO {
        /**大厅分类:1-热门游戏|2-棋牌|4-彩票|8-捕鱼|16-电子|32-真人|64-体育|128-街机|256-老虎机*/
        category: string;
        icon: string;
        index_no: number;
        languages: string;
        open_mode: number;
        ori_product_id: string;
        ori_vendor_extend: any;
        orientation: number;
        status: number;
        vendor_id: number;
        vendor_product_id: number;
        vendor_product_name: string;
        /** 分类名字 */
        category_name: string;
        list: VendorVO[];
        /** 第几个 */
        index: number;
        //game_menu
        vendor_type: number; //厂商游戏类型
        vendor_type_name: string;
        tag_sort:number; //分类的排序
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

        //game_menu
        id: number;
        alias: string; //别名
        entrance_game: string; // //厂商游戏id
        entrance_game_name: string; //厂商游戏名称
        entrance_type: number; //入口类型：1厂商入口 | 2游戏入口
        desc: string; //描述
        menu_icon: string; //菜单icon
        entrance_icon: string; //入口icon
    }
}
