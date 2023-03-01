const commonIcon = {
    logo: require(`@/_skin005/assets/logo.png`),
    logo_m: require(`@/_skin005/assets/logo_m.png`),
    loading: require(`@/_skin005/assets/loading.gif`),
    nodata: require(`@/_skin005/assets/nodata.png`),
    avatar_default: require(`@/_skin005/assets/avatar_default.png`),
    arrow_right: "arrow_right",
    loading_img: "img/loding_icon_5.png",
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
const CategoryIcon = Object.freeze({
    1: "c1",
    2: "c2",
    4: "c4",
    8: "c8",
    16: "c16",
    32: "c32",
    64: "c64",
    128: "c128",
    256: "c128",
    512: "c128",
});

const VipMap = Object.freeze({
    0: require(`@/assets/mine/vip0.png`),
    1: require(`@/assets/mine/vip1.png`),
    2: require(`@/assets/mine/vip2.png`),
    3: require(`@/assets/mine/vip3.png`),
    4: require(`@/assets/mine/vip4.png`),
    5: require(`@/assets/mine/vip5.png`),
    6: require(`@/assets/mine/vip6.png`),
    7: require(`@/assets/mine/vip7.png`),
    8: require(`@/assets/mine/vip8.png`),
    9: require(`@/assets/mine/vip9.png`),
    10: require(`@/assets/mine/vip10.png`),
    11: require(`@/assets/mine/vip11.png`),
    12: require(`@/assets/mine/vip12.png`),
    13: require(`@/assets/mine/vip13.png`),
    14: require(`@/assets/mine/vip14.png`),
    15: require(`@/assets/mine/vip15.png`),
    16: require(`@/assets/mine/vip16.png`),
    17: require(`@/assets/mine/vip17.png`),
    18: require(`@/assets/mine/vip18.png`),
    19: require(`@/assets/mine/vip19.png`),
    20: require(`@/assets/mine/vip20.png`),
});

export default { commonIcon, CategoryIcon, VipMap };
