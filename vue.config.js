/**皮肤配置 */
const skinMap = {
    landing: {
        public_dir: "public_landing",
        pages: {
            landing: {
                entry: "src/_landing/main.ts",
                template: "public_landing/index.html",
                filename: "index.html",
                title: "landing",
                faviconName: "favicon.ico",
            },
        },
    },
    skin003: {
        public_dir: "public_skin003",
        pages: {
            skin003: {
                entry: "src/_skin003/main.ts",
                template: "public_skin003/skin003.html",
                filename: "index.html",
                title: "bet2dream",
                faviconName: "favicon.ico",
            },
        },
    },
    skin004: {
        public_dir: "public_skin004",
        pages: {
            skin004: {
                entry: "src/_skin004/main.ts",
                template: "public_skin004/skin004.html",
                filename: "index.html",
                title: "MG188",
                faviconName: "favicon.ico",
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
            skin004_x: {
                entry: "src/_skin004/main.ts",
                template: "public_skin004/skin004.html",
                filename: "skin004.html",
                title: "MG188",
                faviconName: "favicon.ico",
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
        },
    },
    skin004_1: {
        public_dir: "public_skin004_1",
        pages: {
            skin004_1: {
                entry: "src/_skin004_1/main.ts",
                template: "public_skin004_1/skin004_1.html",
                filename: "index.html",
                title: "CF亚娱",
                faviconName: "favicon.ico",
            },
        },
    },
    skin005: {
        public_dir: "public_skin005",
        pages: {
            skin005: {
                entry: "src/_skin005/main.ts",
                template: "public_skin005/skin005.html",
                filename: "index.html",
                title: "96in",
                faviconName: "favicon.ico",
            },
            pay_redirect: {
                entry: "src/_skin005/pay_redirect.ts",
                template: "public_skin005/pay_redirect.html",
                filename: "pay_redirect.html",
                title: "pay",
                faviconName: "favicon.ico",
            },
        },
    },
    skin006: {
        public_dir: "public_skin006",
        pages: {
            skin006: {
                entry: "src/_skin006/main.ts",
                template: "public_skin006/skin006.html",
                filename: "index.html",
                title: "BetNow",
                faviconName: "favicon.ico",
            },
        },
    },
    skin007: {
        public_dir: "public_skin007",
        pages: {
            skin007: {
                entry: "src/_skin007/main.ts",
                template: "public_skin007/skin007.html",
                filename: "index.html",
                title: "96",
                faviconName: "favicon.ico",
            },
        },
    },
    skin008: {
        public_dir: "public_skin008",
        pages: {
            skin008: {
                entry: "src/_skin008/main.ts",
                template: "public_skin008/skin008.html",
                filename: "index.html",
                title: "96cluble",
                faviconName: "favicon.ico",
            },
        },
    },
    skin100: {
        public_dir: "public_skin100",
        pages: {
            skin100: {
                entry: "src/_skin100/main.ts",
                template: "public_skin100/skin100.html",
                filename: "index.html",
                title: "egame",
                faviconName: "favicon.ico",
            },
        },
    },
    skin101: {
        public_dir: "public_skin101",
        pages: {
            skin101: {
                entry: "src/_skin101/main.ts",
                template: "public_skin101/skin101.html",
                filename: "index.html",
                title: "u5",
                faviconName: "favicon.ico",
            },
        },
    },
};

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
        if (process.env.VUE_APP_SKIN == "") {
            imagesRule.exclude.add(resolve("src/_skin003/icons"));
            imagesRule.exclude.add(resolve("src/_skin005/icons"));
        } else if (process.env.VUE_APP_SKIN == "skin003") {
            imagesRule.exclude.add(resolve("src/_skin003/icons"));
        } else if (["skin005", "skin006", "skin007", "skin008"].includes(process.env.VUE_APP_SKIN)) {
            imagesRule.exclude.add(resolve("src/_skin005/icons"));
        }

        config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    },
    configureWebpack: {
        plugins: getCopyDir(),
    },
    css: {
        extract: {
            ignoreOrder: true,
        },
    },
    pages: getPages(),
};

/**获取需要复制的目录 */
function getCopyDir() {
    const arr = [];
    if (skinMap[process.env.VUE_APP_SKIN]) {
        arr.push(new CopyWebpackPlugin([{ from: skinMap[process.env.VUE_APP_SKIN].public_dir, to: "" }]));
    } else {
        const keys = Object.keys(skinMap);
        for (const key of keys) {
            arr.push(new CopyWebpackPlugin([{ from: skinMap[key].public_dir, to: "" }]));
        }
    }
    return arr;
}
/**获取需要发布的页面 */
function getPages() {
    const pages = {};
    if (skinMap[process.env.VUE_APP_SKIN]) {
        Object.assign(pages, skinMap[process.env.VUE_APP_SKIN].pages);
    } else {
        const skinKeys = Object.keys(skinMap);
        for (const key of skinKeys) {
            Object.assign(pages, skinMap[key].pages);
        }
        const keys = Object.keys(pages);
        for (const key of keys) {
            pages[key].filename = key + ".html";
        }
    }
    return pages;
}
