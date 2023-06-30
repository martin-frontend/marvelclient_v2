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
    AndroidApkUrl: string;
    ios_download_link: string; //ios包下载的地址
    android_download_link: string; //android下载地址
    /**足球厂商ID */
    SportVendorId: number;

    menuType: string; // 游戏菜单的 类型， 为1  就是 用gamemenu  否则不管
    /**三方登录地址 */
    ThirdLoginUrl: string;
    modules_switch: any; //一些功能的配置开关  入 币种介绍，质押分推广赚钱等
    /** 板球厂商id */
    CricketVendorId: number;
    /**游戏列表展示 使用的 数据来源 里面 配置的类型 使用旧版版的，没有配置的则使用  新版本的 */
    casinoPageGameList?: number[];
    /**第一次 设置交易密码 使用的类型 */
    changeGoldPasswordFirstSetting: number;
    /**第一次以后 设置交易密码 使用的类型 */
    changeGoldPasswordFollowSetting: number;
    /**第一次进入时候 默认 页面 例如是homePage："cricket"*/
    homePage: string;
    /**手机版底部的也签 */
    PhoneMenu: string[];
    /**各种渠道的配置，里面的参数与上面相同 */
    ChannelConfig: any;
    // /** 是否显示 注册   0  不显示， 其他显示  */
    // register:string; //
    // /** 是否显示 充值   0  不显示， 其他显示  */
    // recharge:string;
    // /** 是否显示 兑换   0  不显示， 其他显示  */
    // exchange:string;
    // /** 是否显示 划转   0  不显示， 其他显示  */
    // transfer:string;
    /**是否需要显示验证码前面的图形验证码 */
    is_display_auth_code: number;
    /**显示的结算币种 */
    SettlementCurrency: string;
    /**我的每万返佣开关 0 不展示 1 展示  默认展示 */
    MyRebate: number;
    /**返佣每万展现方式 0数值 1百分比  默认0 */
    RebateDisplayType: number;
    /**返佣列表展示方式  0 展示万字 1 展示 全数字  默认为0*/
    RebateListType: number;
    /**我的投注相关配置 */
    mybet_total: {
        pageTotal: number;
        total_bet_gold: number;
        total_valid_bet_gold: number;
        total_win_gold: number;
        total_water: number;
    };
    mybet_title: {
        order_no: number;
        vendor_product_name: number;
        coin_name_unique: number;
        bet_gold: number;
        win_gold: number;
        valid_bet_gold: number;
        water: number;
        settlement_status: number;
        bet_at: number;
        settlement_at: number;
    };
    /**当前h5版本号 */
    h5version: string;
    /**首页表头上面显示的对象配置 */
    head_game_config: any[];
    /**GTM的id可以多个 */
    gtm_id: string;
    /**GTM的id可以多个----这个是我们自己用的主的 */
    gtm_main_id: string;
    /**快手分析 */
    kwaiq_id: string;
    /**是否启用免审金额 */
    enable_exemption_amount: number;
    /**推广奖励活动 ID*/
    promotion_reward_model_id: {
        id: number;
        rule_id: number;
    };
    /**是否需要生日 */
    is_need_birthday: number;
    /**游戏历史记录最大的个数 */
    maxHistoryLength: number;
    /**注册时候的选项 */
    registerOption: any;
    /**弹窗管理 */
    dialog_manager: string[];
}
