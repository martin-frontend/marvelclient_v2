/**
 * 皮肤变量，主要用于 同一套皮 不容平台 不同功能的切换
 */

export default class SkinVariable {
    /** 是否显示下面的底部信息描述 */
    public static isShowFootDetail = false;

    public static loadingType = "004";

    /** 004_1的特殊需求，注册的时候不管有没有邀请码都显示邀请码栏 */
    public static mustShowInvite = false;

    public static pageHead_logo = require(`@/_skin004/assets/logo.png`); //主页 logo图片
    public static pageHead_logo_mob = require(`@/_skin004/assets/logo.png`); //主页 logo图片

    // public static pageHome_project_1 = "~@/_skin004/assets/page_home/project_info_1.png";
    // public static pageHome_project_2 = "~@/_skin004/assets/page_home/project_info_2.png";

    public static pageHome_project_1 = require(`@/_skin004/assets/page_home/project_info_1.png`);
    public static pageHome_project_2 = require(`@/_skin004/assets/page_home/project_info_2.png`);

    public static icon_home = require(`@/_skin001/assets/icon/icon_home.png`);
    public static icon_home1 = require(`@/_skin001/assets/icon/icon_home1.png`);
    public static icon_play = require(`@/_skin001/assets/icon/icon_play.png`);
    public static icon_play1 = require(`@/_skin001/assets/icon/icon_play1.png`);
    public static icon_extension = require(`@/_skin001/assets/icon/icon_extension.png`);
    public static icon_extension1 = require(`@/_skin001/assets/icon/icon_extension1.png`);

    /**是否显示热门赛事 */
    public static isShowSoccerMatche = true;
    public static isExchargeVndk = false;

    /**是否显示 显示保存推广图片的背景 */
    public static isSavePhoto = false;
    public static savePhotoBg = require(`@/assets/extension/poster.jpg`);
    /**默认区号 */
    public static defaultCode = "84";

    public static play_audio = false;
    /**是否显示娱乐城 */
    public static isShowGameList = true;
    /**banner图片宽高比例 */
    public static bannerImageRatio: null | number = null;
    /**显示全部厂商 */
    public static isShowAllVendor = false;
    /**隐藏登出 */
    public static isShowLogout = true;
}
