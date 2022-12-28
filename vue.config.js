const { js_utils } = require("custer-js-utils");
const path = require("path");
function resolve(dir) {
    return path.join(__dirname, "./", dir);
}
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "././" : "./",
    // publicPath:  "././",
    outputDir: "dist",
    indexPath: process.env.INDEX_PATH,
    // productionSourceMap: process.env.VUE_APP_ENV != "production",
    productionSourceMap: false,
    transpileDependencies: ["vuetify"],
    chainWebpack(config) {
        config.plugin("define").tap((args) => {
            args[0]["process.env"].version = `"${js_utils.dateFormat(new Date(), "yyyy-MM-dd hh:mm")}"`;
            return args;
        });
        // svg rule loader
        const svgRule = config.module.rule("svg"); // 找到svg-loader
        svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
        svgRule // 添加svg新的loader处理
            .test(/\.svg$/)
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            });

        // 修改images loader 添加svg处理
        const imagesRule = config.module.rule("images");
        imagesRule.exclude.add(resolve("src/_skin003/icons"));
        config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    },
    css: {
        extract: {
            ignoreOrder: true,
        },
    },
    pages: {
        base: {
            entry: "src/main.ts",
            template: "public/io.html",
            filename: "io.html",
            title: "CoinFans",
        },
        base_copy: {
            entry: "src/main.ts",
            template: "public/index.html",
            filename: "index.html",
            title: "CoinFans",
        },
        skin001: {
            entry: "src/_skin001/main.ts",
            template: "public/index001.html",
            filename: "skin001.html",
            title: "BetNow",
        },
        skin002: {
            entry: "src/_skin002/main.ts",
            template: "public/index002.html",
            filename: "skin002.html",
            title: "11.club",
        },
        skin004: {
            entry: "src/_skin004/main.ts",
            template: "public/skin004.html",
            filename: "skin004.html",
            title: "越南",
        },
        skin003: {
            entry: "src/_skin003/main.ts",
            template: "public/index003.html",
            filename: "skin003.html",
            title: "skin003",
        },
        skin100: {
            entry: "src/_skin100/main.ts",
            template: "public/skin100.html",
            filename: "skin100.html",
            title: "egame",
        },
        skin100: {
            entry: "src/_skin101/main.ts",
            template: "public/skin101.html",
            filename: "skin101.html",
            title: "egame",
        },
    },
};
