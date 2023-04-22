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
    public static loadingType = "005";
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
}
