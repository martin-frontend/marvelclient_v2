import { getVersion } from "@/core/global/Functions";

const commonIcon = {
    logo: require(`@/_skin030/assets/logo.png`),
    logo_m: require(`@/_skin030/assets/logo_m.png`),
    // loading: require(`@/_skin030/assets/loading.gif`),
    nodata: require(`@/_skin030/assets/nodata.png`),
    avatar_default: require(`@/_skin030/assets/avatar_default.png`),
    cat_icon: require(`@/_skin030/assets/mine/cat_icon.png`),
    about_01_bg: require(`@/_skin030/assets/mine/about_01_icon_bg.png`),
    about_02_bg: require(`@/_skin030/assets/mine/about_02_icon_bg.png`),
    about_03_bg: require(`@/_skin030/assets/mine/about_03_icon_bg.png`),
    arrow_right: "arrow_right",
    loading_img: "loding_icon_30.png?" + getVersion(),
    login_logo_m: require(`@/_skin030/assets/login_logo_m.png`),
    login_banner_pc_light: require(`@/_skin030/assets/login_banner_pc_light.png`),
    login_banner_pc_dark: require(`@/_skin030/assets/login_banner_pc_dark.png`),
    seventh_day_img: require(`@/_skin030/assets/daily_sign/gold_7.png`),
};

/**游戏分类图标	
1	热门
2	棋牌
4	彩票
8	捕鱼
16	电子
32	真人
64	体育电竞
128	链游
256	先删除
512	先删除
 */
const CategoryIcon = <any>Object.freeze({
    0: "ky_c0",
    1: "c1",
    2: "ky_c2",
    4: "ky_c4",
    8: "ky_c8",
    16: "ky_c16",
    32: "ky_c32",
    64: "ky_c64",
    128: "ky_c128",
    256: "c128",
    512: "c128",
    3: "history",
});
const CategoryIcon_sel = Object.freeze({
    1: "c1_sel",
    2: "c2_sel",
    4: "c4_sel",
    8: "c8_sel",
    16: "c16_sel",
    32: "c32_sel",
    64: "c64_sel",
    128: "c128_sel",
    256: "c128_sel",
    512: "c128_sel",
    3: "history",
});

const VipMap = Object.freeze({
    0: require(`@/_skin030/assets/mine/VIP0.png`),
    1: require(`@/_skin030/assets/mine/VIP1.png`),
    2: require(`@/_skin030/assets/mine/VIP2.png`),
    3: require(`@/_skin030/assets/mine/VIP3.png`),
    4: require(`@/_skin030/assets/mine/VIP4.png`),
    5: require(`@/_skin030/assets/mine/VIP5.png`),
    6: require(`@/_skin030/assets/mine/VIP6.png`),
    7: require(`@/_skin030/assets/mine/VIP7.png`),
    8: require(`@/_skin030/assets/mine/VIP8.png`),
    9: require(`@/_skin030/assets/mine/VIP9.png`),
    10: require(`@/_skin030/assets/mine/VIP10.png`),
    11: require(`@/_skin030/assets/mine/VIP11.png`),
    12: require(`@/_skin030/assets/mine/VIP12.png`),
    13: require(`@/_skin030/assets/mine/VIP13.png`),
    14: require(`@/_skin030/assets/mine/VIP14.png`),
    15: require(`@/_skin030/assets/mine/VIP15.png`),
    16: require(`@/_skin030/assets/mine/VIP16.png`),
    17: require(`@/_skin030/assets/mine/VIP17.png`),
    18: require(`@/_skin030/assets/mine/VIP18.png`),
    19: require(`@/_skin030/assets/mine/VIP19.png`),
    20: require(`@/_skin030/assets/mine/VIP20.png`),
});
const verityImgArr = [
    require(`@/_skin030/assets/verify/bg_1.jpg`),
    require(`@/_skin030/assets/verify/bg_2.jpg`),
    require(`@/_skin030/assets/verify/bg_3.jpg`),
    require(`@/_skin030/assets/verify/bg_4.jpg`),
    require(`@/_skin030/assets/verify/bg_5.jpg`),
    require(`@/_skin030/assets/verify/bg_6.jpg`),
    require(`@/_skin030/assets/verify/bg_7.jpg`),
    require(`@/_skin030/assets/verify/bg_8.jpg`),
    require(`@/_skin030/assets/verify/bg_9.jpg`),
    require(`@/_skin030/assets/verify/bg_10.jpg`),
];

const commissLevel = [
    require(`@/_skin030/assets/commissions/vip_1.png`),
    require(`@/_skin030/assets/commissions/vip_1.png`),
    require(`@/_skin030/assets/commissions/vip_2.png`),
    require(`@/_skin030/assets/commissions/vip_3.png`),
    require(`@/_skin030/assets/commissions/vip_4.png`),
    require(`@/_skin030/assets/commissions/vip_5.png`),
    require(`@/_skin030/assets/commissions/vip_6.png`),
    require(`@/_skin030/assets/commissions/vip_7.png`),
    require(`@/_skin030/assets/commissions/vip_8.png`),
    require(`@/_skin030/assets/commissions/vip_9.png`),
    require(`@/_skin030/assets/commissions/vip_10.png`),
    require(`@/_skin030/assets/commissions/vip_11.png`),
    require(`@/_skin030/assets/commissions/vip_12.png`),
];

export default { commonIcon, CategoryIcon, VipMap, CategoryIcon_sel, verityImgArr, commissLevel };
