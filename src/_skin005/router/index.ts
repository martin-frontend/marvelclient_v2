import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PanelUtil from "@/_skin005/core/PanelUtil";
import LangConfig from "@/core/config/LangConfig";
import GameConfig from "@/core/config/GameConfig";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/:lang",
        name: "page_home",
        component: () => import(/* webpackChunkName: "skin005_page_home" */ "@/_skin005/views/page_home/views/PageHome.vue"),
    },
    {
        path: "/page_game_list/:lang",
        name: "page_game_list",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/page_game_list/:vendor_type/:lang",
        name: "page_game_list",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/sports/:lang",
        name: "sports",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/live-casino-online/:lang",
        name: "live-casino-online",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/blockchain-games/:lang",
        name: "blockchain-games",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/fishing-games/:lang",
        name: "fishing-games",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/slots-games/:lang",
        name: "slots-games",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/lottery-games/:lang",
        name: "lottery-games",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/cards-games/:lang",
        name: "cards-games",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/page_game_list_chess/:lang",
        name: "page_game_list_chess",
        component: () =>
            import(
                /* webpackChunkName: "skin005_page_game_list_chess" */ "@/_skin001/views/page_game_list_chess/views/PageGameListChess.vue"
            ),
    },
    {
        path: "/page_game_play/:lang",
        name: "page_game_play",
        component: () => import(/* webpackChunkName: "skin005_page_game_play" */ "@/_skin005/views/page_game_play/views/PageGamePlay.vue"),
    },
    {
        path: "/page_game_soccer/:lang",
        name: "page_game_soccer",
        component: () =>
            import(/* webpackChunkName: "skin005_page_game_soccer" */ "@/_skin005/views/page_game_soccer/views/PageGameSoccer.vue"),
    },
    {
        path: "/cricket/:lang",
        name: "cricket",
        component: () =>
            import(/* webpackChunkName: "skin005_page_game_soccer" */ "@/_skin005/views/page_game_soccer/views/PageGameSoccer.vue"),
    },
    {
        path: "/page_introduce/:lang",
        name: "page_introduce",
        component: () => import(/* webpackChunkName: "skin005_page_introduce" */ "@/_skin005/views/page_introduce/views/PageIntroduce.vue"),
    },
    {
        path: "/commissions/:lang",
        name: "commissions",
        component: () => import(/* webpackChunkName: "skin005_page_extension" */ "@/_skin005/views/page_extension/views/PageExtension.vue"),
    },
    {
        path: "/page_mine/:lang",
        name: "page_mine",
        component: () => import(/* webpackChunkName: "skin005_page_mine" */ "@/_skin005/views/page_mine/views/PageMine.vue"),
    },
    {
        path: "/page_bonus/:lang",
        name: "page_bonus",
        component: () => import(/* webpackChunkName: "skin005_page_bonus" */ "@/_skin005/views/page_bonus/views/PageBonus.vue"),
    },
    {
        path: "/page_swap/:lang",
        name: "page_swap",
        component: () => import(/* webpackChunkName: "skin005_page_swap" */ "@/_skin005/views/page_swap/views/PageSwap.vue"),
    },
    {
        path: "/page_statistice_credit/:lang",
        name: "page_statistice_credit",
        component: () =>
            import(
                /* webpackChunkName: "skin005_page_statistice_credit" */ "@/_skin005/views/page_statistice_credit/views/PageStatisticeCredit.vue"
            ),
    },
    {
        path: "/page_my_info/:lang",
        name: "page_my_info",
        component: () => import(/* webpackChunkName: "skin005_page_my_info" */ "@/_skin005/views/page_my_info/views/PageMyInfo.vue"),
    },
    {
        path: "/page_recharge/:lang",
        name: "page_recharge",
        component: () => import(/* webpackChunkName: "skin005_page_recharge" */ "@/_skin005/views/page_recharge/views/PageRecharge.vue"),
    },
    {
        path: "/promotions/:lang",
        name: "promotions",
        component: () => import(/* webpackChunkName: "skin005_page_activity" */ "@/_skin005/views/page_activity/views/PageActivity.vue"),
    },
    {
        path: "/page_rules/:lang",
        name: "page_rules",
        component: () =>
            import(/* webpackChunkName: "skin005_page_rules" */ "@/_skin005/views/page_rules_hidden/views/PageRulesHidden.vue"),
    },
];

/**修正router push 相同页时Avoided redundant navigation to current location 错误 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
    //@ts-ignore
    return originalPush.call(this, location).catch((err: any) => err);
};

export let prePath = "";
let router: VueRouter;

export function getRouter(): VueRouter {
    if (!router) {
        const isProduction = process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV == "production";
        const channelStr = (!isProduction ? location.hash : location.pathname).split("/")[1];
        if (channelStr && !isNaN(Number(channelStr))) {
            prePath = "/" + channelStr;
            for (const r of routes) {
                r.path = prePath + r.path;
            }
        }
        router = new VueRouter({
            mode: process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV == "production" ? "history" : "hash",
            // mode: "history",
            routes,
        });
        router.beforeEach((to: any, from: any, next: any) => {
            if (to.path.indexOf("cricket") != -1) {
                addMetaWithType("cricket");
            } else if (to.path.indexOf("sports") != -1) {
                addMetaWithType("sports");
            } else if (to.path.indexOf("blockchain-games") != -1) {
                addMetaWithType("blockchain");
            } else if (to.path.indexOf("fishing-games") != -1) {
                addMetaWithType("fishing");
            } else if (to.path.indexOf("live-casino-online") != -1) {
                addMetaWithType("live");
            } else if (to.path.indexOf("slots-games") != -1) {
                addMetaWithType("slot");
            } else if (to.path.indexOf("cards-games") != -1) {
                addMetaWithType("cards");
            } else if (to.path.indexOf("lottery-games") != -1) {
                addMetaWithType("lottery");
            } else {
                addMetaWithType("");
            }
            if (prePath && to.path.indexOf(prePath) == -1) {
                next(prePath + to.path);
            } else if (!LangConfig.language[LangConfig.getLangByRouter(to.path)]) {
                console.warn(">>>>>>>>>>>", to.path);
                if (to.path == "/") {
                    if (GameConfig.config.homePage) {
                        next(`${prePath}/${GameConfig.config.homePage}/${LangConfig.getRouterLang()}`);
                    } else {
                        next(`${prePath}/${LangConfig.getRouterLang()}`);
                    }
                } else {
                    const pathSplit = to.path.split("/");
                    if (prePath) {
                        if (pathSplit.length == 5) {
                            next(`${prePath}/${pathSplit[2]}/${pathSplit[3]}/${LangConfig.getRouterLang()}`);
                        } else {
                            next(`${to.path}/${LangConfig.getRouterLang()}`);
                        }
                    } else {
                        if (pathSplit.length == 4) {
                            next(`${pathSplit[1]}/${pathSplit[2]}/${LangConfig.getRouterLang()}`);
                        } else {
                            next(`${to.path}/${LangConfig.getRouterLang()}`);
                        }
                    }
                }
            } else {
                console.warn(">>>>>>>>>>>", to.path);
                if (
                    !core.user_id &&
                    (to.path.includes("page_recharge") ||
                        to.path.includes("page_game_play") ||
                        to.path.includes("page_my_info") ||
                        to.path.includes("page_statistice_credit") ||
                        to.path.includes("page_game_soccer"))
                ) {
                    next(`${prePath}/${LangConfig.getRouterLang()}`);
                } else {
                    console.warn("to: ", to);
                    console.log(routes);
                    if (routes.some((e, index, array) => e.name == to.name)) {
                        if (to.path.includes("page_game_play") && !PanelUtil.getProxy_gameproxy.currGame.vendor_id) {
                            next(`${prePath}/${LangConfig.getRouterLang()}`);
                        } else {
                            if (router.mode == "history") changeManifeseJson(to.path);
                            next();
                        }
                    } else {
                        console.log("路由不存在", to.path);
                        next(`${prePath}/${LangConfig.getRouterLang()}`);
                    }
                }
            }
        });
    }
    return router;
}
/**动态修改manifest.json start_url */
function changeManifeseJson(start_url: string) {
    fetch("manifest.json")
        .then((response) => response.json())
        .then((json) => {
            json.start_url = start_url;
            const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link: any = document.querySelector('link[rel="manifest"]');
            link.href = url;
        });
}

const metaArr = <any[]>[];
function addMetaWithType(type: string) {
    while (metaArr.length > 0) {
        const meta = metaArr.pop();
        meta.remove();
    }
    switch (type) {
        case "cricket":
            document.title = "Cricket Betting -  Live Cricket Score Betting Odds, Rules and Tips";
            addMeta("title", "Cricket Betting Online 2023 - Live Cricket Betting Odds Online");
            addMeta(
                "description",
                "Cricket Betting Odds Online - Betting on Cricket is a thrilling and exciting way to enjoy the game. Now bet on cricket with the best cricket betting tips and win money at 96in.com"
            );
            break;
        case "sports":
            document.title = "Online Sports betting - Best Sports Betting App";
            addMeta("title", "Best Sports Betting Site Online - Legal Sports Betting odds");
            addMeta(
                "description",
                "Sports betting - Play the games online with best sports betting app 96in.com and win exciting prizes. Now bet on all sports online legal, safe and secure deposit"
            );
            break;
        case "fishing":
            document.title = "Fishing games: Tips and strategies to win";
            addMeta("title", "Play Fishing Games Online and Win Money");
            addMeta(
                "description",
                "Fishing games have become increasingly popular in recent years. Play fishing games online similar to fishing games on PC, Xbox, PS4 etc"
            );
            break;
        case "blockchain":
            document.title = "Blockchain games Online -  Play and win in blockchain games";
            addMeta("title", "Blockchain Games - Top Blockchain Games  Online");
            addMeta(
                "description",
                "Play the best blockchain games online at 96in.com. We provide the top blockchain games and tips to win money online"
            );
            break;
        case "live":
            document.title = "Live Casino Games Online - Online Casino for Real Money";
            addMeta("title", "Online Casino Games - Online Casino for Real Money");
            addMeta(
                "description",
                "Play all live casino games online in 96in.com such as andar bahar, teen patti, roulette, baccarat etc. Play to win Online Casino for Real Money"
            );
            break;
        case "slot":
            document.title = "Slot games: How to play, rules, tips and strategies";
            addMeta("title", "Slot Games - Best Free Slot Machine Games Online");
            addMeta(
                "description",
                "Slot games are easy to play and offer the excitement of a big win. Now play the best free slot machine games online"
            );
            break;
        case "lottery":
            document.title = "Lottery games: How to play, rules, tips and strategies";
            addMeta("title", "Lottery Games - Top Lottery Games Online");
            addMeta(
                "description",
                "Play the best lottery games online at 96in.com. We provide the top lottery games and tips to win money online"
            );
            break;
        case "cards":
            document.title = "Cards games: How to play, rules, tips and strategies";
            addMeta("title", "Cards Games - Top Cards Games Online");
            addMeta(
                "description",
                "Play the best cards games online at 96in.com. We provide the top cards games and tips to win money online"
            );
            break;
        default:
            document.title = "96";
            break;
    }
}
function addMeta(name: string, content: string) {
    const meta = document.createElement("meta");
    meta.content = content;
    meta.name = name;
    document.getElementsByTagName("head")[0].appendChild(meta);
    metaArr.push(meta);
}
