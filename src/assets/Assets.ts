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
    128: "mdi-cards-playing",
    256: "mdi-cards-playing",
    512: "mdi-cards-playing",
});

export default { commonIcon, CategoryIcon };
