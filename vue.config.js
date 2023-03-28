const CopyWebpackPlugin = require("copy-webpack-plugin");
const { js_utils } = require("custer-js-utils");
const path = require("path");
function resolve(dir) {
    return path.join(__dirname, "./", dir);
}
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "././" : "./",
    // publicPath: "././",
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
        if (process.env.VUE_APP_SKIN == "skin003") {
            imagesRule.exclude.add(resolve("src/_skin003/icons"));
        }
        if (["skin005", "skin006", "skin007"].includes(process.env.VUE_APP_SKIN)) {
            imagesRule.exclude.add(resolve("src/_skin005/icons"));
        }

        config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    },
    configureWebpack: {
        plugins: [
            // 拷贝静态文件到目标文件
            new CopyWebpackPlugin([{ from: getStaticDir(), to: "" }]),
        ],
    },
    css: {
        extract: {
            ignoreOrder: true,
        },
    },
    pages: getPages(),
};

function getStaticDir() {
    switch (process.env.VUE_APP_SKIN) {
        case "skin003":
            return "public_skin003";
        case "skin004":
            return "public_skin004";
        case "skin004_1":
            return "public_skin004_1";
        case "skin005":
            return "public_skin005";
        case "skin006":
            return "public_skin006";
        case "skin100":
            return "public_skin100";
        case "skin101":
            return "public_skin101";
        default:
            return "public_dev";
    }
}

function getPages() {
    if (process.env.VUE_APP_SKIN == "skin003") {
        return {
            skin003: {
                entry: "src/_skin003/main.ts",
                template: "public_skin003/skin003.html",
                filename: "index.html",
                title: "003",
            },
        };
    } else if (process.env.VUE_APP_SKIN == "skin004") {
        return {
            skin004: {
                entry: "src/_skin004/main.ts",
                template: "public_skin004/skin004.html",
                filename: "index.html",
                title: "MG188",
                meta: {
                    robots: "noindex",
                    AdsBot_Google: "noindex",
                    googlebot: "noindex",
                    og_title: "MG188",
                    og_type: "website",
                    og_description:
                        "casino, thể thao, slot game, game bài, lô đề, đá gà, bắn cá, thể thao esport ... đặt cược vnđ hoặc usdt cực hấp dẫn",
                    og_url: "https://mg188.com",
                    og_image: "https://mg188.com/img/project_info_2.39763581.png",
                    twitter_title: "MG188",
                    twitter_description:
                        "casino, thể thao, slot game, game bài, lô đề, đá gà, bắn cá, thể thao esport ... đặt cược vnđ hoặc usdt cực hấp dẫn",
                    twitter_image: "https://mg188.com/img/project_info_2.39763581.png",
                },
            },
        };
    } else if (process.env.VUE_APP_SKIN == "skin004_1") {
        return {
            skin004_1: {
                entry: "src/_skin004_1/main.ts",
                template: "public_skin004_1/skin004_1.html",
                filename: "index.html",
                title: "CF亚娱",
            },
        };
    } else if (process.env.VUE_APP_SKIN == "skin005") {
        return {
            skin005: {
                entry: "src/_skin005/main.ts",
                template: "public_skin005/skin005.html",
                filename: "index.html",
                title: "96",
            },
        };
    } else if (process.env.VUE_APP_SKIN == "skin006") {
        return {
            skin006: {
                entry: "src/_skin006/main.ts",
                template: "public_skin006/skin006.html",
                filename: "index.html",
                title: "BetNow",
            },
        };
    } else if (process.env.VUE_APP_SKIN == "skin100") {
        return {
            skin100: {
                entry: "src/_skin100/main.ts",
                template: "public_skin100/skin100.html",
                filename: "index.html",
                title: "egame",
            },
        };
    } else if (process.env.VUE_APP_SKIN == "skin101") {
        return {
            skin101: {
                entry: "src/_skin101/main.ts",
                template: "public_skin101/skin101.html",
                filename: "index.html",
                title: "u5",
            },
        };
    }
    return {
        base: {
            entry: "src/main.ts",
            template: "public_dev/io.html",
            filename: "io.html",
            title: "CoinFans",
        },
        base_copy: {
            entry: "src/main.ts",
            template: "public_dev/index.html",
            filename: "index.html",
            title: "CoinFans",
        },
        skin001: {
            entry: "src/_skin001/main.ts",
            template: "public_dev/index001.html",
            filename: "skin001.html",
            title: "BetNow",
        },
        skin002: {
            entry: "src/_skin002/main.ts",
            template: "public_dev/index002.html",
            filename: "skin002.html",
            title: "11.club",
        },
        skin003: {
            entry: "src/_skin003/main.ts",
            template: "public_dev/index003.html",
            filename: "skin003.html",
            title: "skin003",
        },
        skin004: {
            entry: "src/_skin004/main.ts",
            template: "public_dev/skin004.html",
            filename: "skin004.html",
            title: "MG188",
            meta: {
                robots: "noindex",
                AdsBot_Google: "noindex",
                googlebot: "noindex",
                og_title: "MG188",
                og_type: "website",
                og_description:
                    "casino, thể thao, slot game, game bài, lô đề, đá gà, bắn cá, thể thao esport ... đặt cược vnđ hoặc usdt cực hấp dẫn",
                og_url: "https://mg188.com",
                og_image: "https://mg188.com/img/project_info_2.39763581.png",
                twitter_title: "MG188",
                twitter_description:
                    "casino, thể thao, slot game, game bài, lô đề, đá gà, bắn cá, thể thao esport ... đặt cược vnđ hoặc usdt cực hấp dẫn",
                twitter_image: "https://mg188.com/img/project_info_2.39763581.png",
            },
        },
        skin004_1: {
            entry: "src/_skin004_1/main.ts",
            template: "public_dev/skin004_1.html",
            filename: "skin004_1.html",
            title: "CF亚娱",
        },
        skin005: {
            entry: "src/_skin005/main.ts",
            template: "public_dev/skin005.html",
            filename: "skin005.html",
            title: "96",
        },
        skin006: {
            entry: "src/_skin006/main.ts",
            template: "public_dev/skin006.html",
            filename: "skin006.html",
            title: "BetNow",
        },
        skin100: {
            entry: "src/_skin100/main.ts",
            template: "public_dev/skin100.html",
            filename: "skin100.html",
            title: "egame",
        },
        skin101: {
            entry: "src/_skin101/main.ts",
            template: "public_dev/skin101.html",
            filename: "skin101.html",
            title: "U5",
        },
    };
}
