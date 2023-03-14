const commonIcon = {
    logo: require(`@/assets/logo.png`),
    loading: require(`@/assets/loading.gif`),
    loading_b: require(`@/assets/loading_b.gif`),
    nodata: require(`@/assets/nodata.png`),
    nodata_b: require(`@/assets/nodata_b.png`),
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
    1: "mdi-fire",
    2: "mdi-cards-playing",
    4: "mdi-ticket",
    8: "mdi-fish",
    16: "mdi-gamepad-variant",
    32: "mdi-video",
    64: "mdi-soccer",
    128: "mdi-link-variant",
    256: "mdi-cards-playing",
    512: "mdi-cards-playing",
});

const CategoryIcon101 = Object.freeze({
    1: require(`@/_skin101/assets/img/navi_icon/qp.png`),
    2: require(`@/_skin101/assets/img/navi_icon/qp.png`),
    4: require(`@/_skin101/assets/img/navi_icon/cp.png`),
    8: require(`@/_skin101/assets/img/navi_icon/by.png`),
    16: require(`@/_skin101/assets/img/navi_icon/dz.png`),
    32: require(`@/_skin101/assets/img/navi_icon/zr.png`),
    64: require(`@/_skin101/assets/img/navi_icon/ty.png`),
    128: require(`@/_skin101/assets/img/navi_icon/ly.png`),
    1001: require(`@/_skin101/assets/img/navi_icon/sy.png`),
    1002: require(`@/_skin101/assets/img/navi_icon/bz.png`),
});

const CategoryIconActive101 = Object.freeze({
    1: require(`@/_skin101/assets/img/navi_icon/qp_a.png`),
    2: require(`@/_skin101/assets/img/navi_icon/qp_a.png`),
    4: require(`@/_skin101/assets/img/navi_icon/cp_a.png`),
    8: require(`@/_skin101/assets/img/navi_icon/by_a.png`),
    16: require(`@/_skin101/assets/img/navi_icon/dz_a.png`),
    32: require(`@/_skin101/assets/img/navi_icon/zr_a.png`),
    64: require(`@/_skin101/assets/img/navi_icon/ty_a.png`),
    128: require(`@/_skin101/assets/img/navi_icon/ly_a.png`),
    1001: require(`@/_skin101/assets/img/navi_icon/sy_a.png`),
    1002: require(`@/_skin101/assets/img/navi_icon/bz_a.png`),
});

export default { commonIcon, CategoryIcon, CategoryIcon101, CategoryIconActive101 };
