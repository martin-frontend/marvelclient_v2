/**
 * 皮肤变量，主要用于 同一套皮 不容平台 不同功能的切换
 */

export default class SkinVariable {
    /** 是否显示下面的底部信息描述 */
    public static isShowFootDetail = false;
    /**是否为自定义 底部的 联系我们按钮 */
    public static isCustomizeFooter = true;
    /**手机版 是否显示 底部 的网页信息 */
    public static isShowMobileFooter = true;
    public static loadingType = "016";
    /**是否需要添加 消息推送的 代码 */
    public static isNeedPush = false;
    /**是否需要 使用 自定义客服 */
    public static isNeedKefu = false;
    /**使用旧的弹窗类型的充值兑换 */
    public static isUsedDialogRecharge = false;

    public static isForeShowRecharge = false;
    /**是否使用google tag manager */
    public static useGTM = false;
    /**是否使用AppsFlyer */
    public static useFlyerLog = false;
    /**导航和 head上面是否使用 完整的logo */
    public static isShowfullLogo = false;
    /**首页是否显示game_type */
    public static isShowGameType = false;
    /**注册时候 是否显示未成年勾选框 */
    public static isShowRestrictions = false;
    /**首页足球是否放在排列的最上面 */
    public static isFootballTop = true;

    /**首页足球是否放在排列的最上面 */
    public static isLobbyGameTop = false;

    /**手机版的系统自带的客服的位置 */
    public static systemKefuTop = true;
    /**邮件一键领取 是否需要弹窗确认 */
    public static mail_get_gift_config = false;
    /**是否使用自动主题 */
    public static autoTheme = true;
    /**是否需要下载按钮 */
    public static isNeedDownloadBtn = true;
    /**是否需要下载按钮 */
    public static isWallet_Recharge = true;
    public static gamelist_other = false;
    /**是否显示用户认证 */
    public static isShowPlatUsersVerification = false;
    /**是否显示GameList的導航 */
    public static isShowGameListNovigation = true;
    /**是否默认按厂商分类 */
    public static isUseVendorType = false;
    /**游戏icon的类型 */
    public static gameIconType = 0;
    /**調整08皮banner高度 */
    public static adjustBannerHeightFor08Skin = false;
}
