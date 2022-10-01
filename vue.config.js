const { js_utils } = require("custer-js-utils");
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
        skin100: {
            entry: "src/_skin100/main.ts",
            template: "public/skin100.html",
            filename: "skin100.html",
            title: "egame",
        },
    },
};
