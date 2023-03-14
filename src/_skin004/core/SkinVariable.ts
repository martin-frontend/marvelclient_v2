/**
 * 皮肤变量，主要用于 同一套皮 不容平台 不同功能的切换
 */

export default class SkinVariable {

    /** 是否显示下面的底部信息描述 */
    public static isShowFootDetail = false;

    public static loadingType = "004";

    public static pageHead_logo = require(`@/_skin004/assets/logo.png`); //主页 logo图片
    //public static pageHead_logo_mob="@/_skin004/assets/logo.png" //主页 logo图片

    // public static pageHome_project_1 = "~@/_skin004/assets/page_home/project_info_1.png";
    // public static pageHome_project_2 = "~@/_skin004/assets/page_home/project_info_2.png";

    public static pageHome_project_1 = require(`@/_skin004/assets/page_home/project_info_1.png`);
    public static pageHome_project_2 = require(`@/_skin004/assets/page_home/project_info_2.png`);

    /**是否显示热门赛事 */
    public static isShowSoccerMatche = true ;
    public static isExchargeVndk = false;
}