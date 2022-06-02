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
    pages: {
        base: {
            entry: 'src/main.ts',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'CoinFans',
        },
        skin01: {
            entry: 'src/main.ts',
            template: 'public/skin01.html',
            filename: 'skin01.html',
            title: 'skin01',
        }
    }
};
