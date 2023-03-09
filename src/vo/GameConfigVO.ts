/**
 * 配置文件，需要在配置文件中配置的全局使用的参数
 */
export interface GameConfigVO {
    /**与PHP交互API地址 */
    ApiUrl: string;
    /**客服地址 */
    cServer: string;
    /**skinId，皮肤版本号 */
    skinId: string;
    /**skinSudId，扩展皮肤版本号，用于区分不同的厂商平台不同的loading页，背景音乐等 */
    skinSudId: string;
    /**配置文件的cdn地址 */
    CdnUrl: string;
    /**官网地址地址 */
    DownLoadPageUrl: string;
    /**首页菜单排序 */
    category_order: number[];
    /** 语言版本 */
    lang: string;
    /**下载地址 */
    AndroidApkUrl:string;
    ios_download_link:string;//ios包下载的地址
    android_download_link:string; //android下载地址
    /**足球厂商ID */
    SportVendorId:number;

    menuType:string; // 游戏菜单的 类型， 为1  就是 用gamemenu  否则不管
    /**三方登录地址 */
    ThirdLoginUrl:string;
    modules_switch:any;//一些功能的配置开关  入 币种介绍，质押分推广赚钱等
    /** 板球厂商id */
    CricketVendorId:number;
    // /** 是否显示 注册   0  不显示， 其他显示  */
    // register:string; // 
    // /** 是否显示 充值   0  不显示， 其他显示  */
    // recharge:string; 
    // /** 是否显示 兑换   0  不显示， 其他显示  */
    // exchange:string; 
    // /** 是否显示 划转   0  不显示， 其他显示  */
    // transfer:string; 

}
