import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PanelUtil from "@/_skin030/core/PanelUtil";
import LangConfig from "@/core/config/LangConfig";
import GameConfig from "@/core/config/GameConfig";
import LangUtil from "@/core/global/LangUtil";

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "page_home",
        component: () => import(/* webpackChunkName: "skin030_page_home" */ "@/_skin030/views/page_home/views/PageHome.vue"),
    },
    {
        path: "/page_game_list",
        name: "page_game_list",
        component: () => import(/* webpackChunkName: "skin030_page_game_list" */ "@/_skin030/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/page_game_list/:vendor_type",
        name: "page_game_list",
        component: () => import(/* webpackChunkName: "skin030_page_game_list" */ "@/_skin030/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/sports",
        name: "sports",
        // component: () => import(/* webpackChunkName: "skin030_page_game_list" */ "@/_skin030/views/page_game_list/views/PageGameList.vue"),
        component: () => import(/* webpackChunkName: "skin030_page_casino_list" */ "@/_skin030/views/page_casino_sport/views/PageCasinoSport.vue"),
    },
    {
        path: "/live-casino-online",
        name: "live-casino-online",
        // component: () => import(/* webpackChunkName: "skin030_page_game_list" */ "@/_skin030/views/page_game_list/views/PageGameList.vue"),
        component: () => import(/* webpackChunkName: "skin030_page_casino_list" */ "@/_skin030/views/page_casino_list/views/PageCasinoList.vue"),
    },
    {
        path: "/blockchain-games",
        name: "blockchain-games",
        // component: () => import(/* webpackChunkName: "skin030_page_game_list" */ "@/_skin030/views/page_game_list/views/PageGameList.vue"),
        component: () => import(/* webpackChunkName: "skin030_page_casino_list" */ "@/_skin030/views/page_casino_list/views/PageCasinoList.vue"),
    },
    {
        path: "/fishing-games",
        name: "fishing-games",
        // component: () => import(/* webpackChunkName: "skin030_page_game_list" */ "@/_skin030/views/page_game_list/views/PageGameList.vue"),
        component: () => import(/* webpackChunkName: "skin030_page_casino_list" */ "@/_skin030/views/page_casino_list/views/PageCasinoList.vue"),
    },
    {
        path: "/slots-games",
        name: "slots-games",
        // component: () => import(/* webpackChunkName: "skin030_page_game_list" */ "@/_skin030/views/page_game_list/views/PageGameList.vue"),
        component: () => import(/* webpackChunkName: "skin030_page_casino_list" */ "@/_skin030/views/page_casino_list/views/PageCasinoList.vue"),
    },
    {
        path: "/lottery-games",
        name: "lottery-games",
        // component: () => import(/* webpackChunkName: "skin030_page_game_list" */ "@/_skin030/views/page_game_list/views/PageGameList.vue"),
        component: () => import(/* webpackChunkName: "skin030_page_casino_list" */ "@/_skin030/views/page_casino_list/views/PageCasinoList.vue"),
    },
    {
        path: "/cards-games",
        name: "cards-games",
        // component: () => import(/* webpackChunkName: "skin030_page_game_list" */ "@/_skin030/views/page_game_list/views/PageGameList.vue"),
        component: () => import(/* webpackChunkName: "skin030_page_casino_list" */ "@/_skin030/views/page_casino_list/views/PageCasinoList.vue"),
    },
    {
        path: "/game-history",
        name: "game-history",
        component: () => import(/* webpackChunkName: "skin030_page_game_list" */ "@/_skin030/views/page_casino_list/views/PageCasinoList.vue"),
    },
    {
        path: "/challenges",
        name: "challenges",
        component: () => import(/* webpackChunkName: "skin030_page_casino_list" */ "@/_skin030/views/page_casino_list/views/PageCasinoList.vue"),
    },
    {
        path: "/page_game_list_chess/",
        name: "page_game_list_chess",
        component: () =>
            import(
                /* webpackChunkName: "skin030_page_game_list_chess" */ "@/_skin001/views/page_game_list_chess/views/PageGameListChess.vue"
            ),
    },
    {
        path: "/page_game_play",
        name: "page_game_play",
        component: () => import(/* webpackChunkName: "skin030_page_game_play" */ "@/_skin030/views/page_game_play/views/PageGamePlay.vue"),
    },
    {
        path: "/page_game_soccer",
        name: "page_game_soccer",
        component: () =>
            import(/* webpackChunkName: "skin030_page_game_soccer" */ "@/_skin030/views/page_game_soccer/views/PageGameSoccer.vue"),
    },
    {
        path: "/cricket",
        name: "cricket",
        component: () =>
            import(/* webpackChunkName: "skin030_page_game_soccer" */ "@/_skin030/views/page_game_soccer/views/PageGameSoccer.vue"),
    },
    {
        path: "/page_introduce",
        name: "page_introduce",
        component: () => import(/* webpackChunkName: "skin030_page_introduce" */ "@/_skin030/views/page_introduce/views/PageIntroduce.vue"),
    },
    {
        path: "/commissions",
        name: "commissions",
        component: () => import(/* webpackChunkName: "skin030_page_extension" */ "@/_skin030/views/page_extension/views/PageExtension.vue"),
    },
    {
        path: "/vip_rewards",
        name: "vip_rewards",
        component: () => import(/* webpackChunkName: "skin030_page_mine" */ "@/_skin030/views/page_mine/views/PageMine.vue"),
    },
    {
        path: "/page_bonus",
        name: "page_bonus",
        component: () => import(/* webpackChunkName: "skin030_page_bonus" */ "@/_skin030/views/page_bonus/views/PageBonus.vue"),
    },
    {
        path: "/page_swap",
        name: "page_swap",
        component: () => import(/* webpackChunkName: "skin030_page_swap" */ "@/_skin030/views/page_swap/views/PageSwap.vue"),
    },
    {
        path: "/page_statistice_credit",
        name: "page_statistice_credit",
        component: () =>
            import(
                /* webpackChunkName: "skin030_page_statistice_credit" */ "@/_skin030/views/page_statistice_credit/views/PageStatisticeCredit.vue"
            ),
    },
    {
        path: "/page_my_info",
        name: "page_my_info",
        component: () => import(/* webpackChunkName: "skin030_page_my_info" */ "@/_skin030/views/page_my_info/views/PageMyInfo.vue"),
    },
    {
        path: "/page_recharge",
        name: "page_recharge",
        component: () => import(/* webpackChunkName: "skin030_page_recharge" */ "@/_skin030/views/page_recharge/views/PageRecharge.vue"),
    },
    {
        path: "/promotions",
        name: "promotions",
        component: () => import(/* webpackChunkName: "skin030_page_activity" */ "@/_skin030/views/page_activity/views/PageActivity.vue"),
    },
    {
        path: "/page_rules",
        name: "page_rules",
        component: () =>
            import(/* webpackChunkName: "skin030_page_rules" */ "@/_skin030/views/page_rules_hidden/views/PageRulesHidden.vue"),
    },
    {
        path: "/page_promotion_statistics",
        name: "page_promotion_statistics",
        component: () =>
            import(
                /* webpackChunkName: "skin030_page_promotion_statistics" */ "@/_skin030/views/page_promotion_statistics/views/PagePromotionStatistics.vue"
            ),
    },
    {
        path: "/page_coin_task",
        name: "page_coin_task",
        component: () => import(/* webpackChunkName: "skin030_page_coin_task" */ "@/_skin030/views/page_coin_task/views/PageCoinTask.vue"),
    },
    {
        path: "/page_casino_lobby",
        name: "page_casino_lobby",
        component: () =>
            import(/* webpackChunkName: "skin030_page_casino_lobby" */ "@/_skin030/views/page_casino_lobby/views/PageCasinoLobby.vue"),
    },
    {
        path: "/vendor",
        name: "vendor",
        component: () => import(/* webpackChunkName: "skin030_page_casino_list" */ "@/_skin030/views/page_casino_list/views/PageCasinoList.vue"),
    },
];

/**修正router push 相同页时Avoided redundant navigation to current location 错误 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
    //@ts-ignore
    return originalPush.call(this, location).catch((err: any) => err);
};

let prePath = "";
let router: VueRouter;
let isNeedJumpHomePage: boolean = true;

export function getRouter(): VueRouter {
    if (!router) {
        const isProduction = process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV == "production";
        const channelStr = (!isProduction ? location.hash : location.pathname).split("/")[1];
        if (channelStr && !isNaN(Number(channelStr))) {
            prePath = "/" + channelStr;
        }
        prePath += "/" + LangConfig.getRouterLang();
        Vue.prePath = prePath;
        for (const r of routes) {
            r.path = prePath + r.path;
        }

        let mode = process.env.VUE_APP_ROUTER_MODEL || "hash";
        //@ts-ignore
        if (core.app_type == core.EnumAppType.APP || window.navigator.standalone) {
            mode = "hash";
        }

        router = new VueRouter({
            mode: mode,
            // process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV == "production" && core.app_type != core.EnumAppType.APP
            //     ? "history"
            //     : "hash",
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
            const homePage = GameConfig.config.homePage ?? "";
            // 语言发生变化，重新加载页面
            if (prePath && prePath.indexOf(LangConfig.getRouterLang()) == -1) {
                const currLang = prePath.split("/").reverse()[0];
                prePath = prePath.replace(currLang, LangConfig.getRouterLang());
                next();
                location.reload();
            }
            //是否需要跳转到配置的homePage
            if (isNeedJumpHomePage) {
                isNeedJumpHomePage = !!(to.path == "/" && GameConfig.config.homePage);
            }
            if (isNeedJumpHomePage) {
                isNeedJumpHomePage = false;
                next(`${prePath}/${homePage}`);
            } else if (prePath && to.path.indexOf(prePath) == -1) {
                next(prePath + to.path);
            } else {
                if (
                    !core.user_id &&
                    (to.path.includes("page_recharge") ||
                        to.path.includes("page_my_info") ||
                        to.path.includes("page_statistice_credit") ||
                        to.path.includes("page_promotion_statistics") ||
                        to.path.includes("page_coin_task"))
                ) {
                    next(`${prePath}/${homePage}`);
                } else {
                    if (routes.some((e, index, array) => e.name == to.name)) {
                        if (to.path.includes("page_game_play") && !PanelUtil.getProxy_gameproxy.currGame.vendor_id) {
                            next(`${prePath}/${homePage}`);
                        } else {
                            if (router.mode == "history") {
                                changeManifeseJson(to.path);
                                const link: any = document.querySelector('link[rel="canonical"]');
                                link.href = location.origin;
                            }
                            next();
                        }
                    } else {
                        console.log("路由不存在", to.path);
                        next(`${prePath}/${homePage}`);
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
            json.start_url = location.origin + start_url;
            const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link: any = document.querySelector('link[rel="manifest"]');
            link.href = url;
        });
}
function set_h1_title(str: string) {
    const html_h1 = document.getElementById("html_h1");
    if (html_h1) {
        html_h1.innerText = str;
    }
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
            set_h1_title("Cricket Betting -  Live Cricket Score Betting Odds, Rules and Tips");
            break;
        case "sports":
            document.title = "Online Sports betting - Best Sports Betting App";
            addMeta("title", "Best Sports Betting Site Online - Legal Sports Betting odds");
            addMeta(
                "description",
                "Sports betting - Play the games online with best sports betting app 96in.com and win exciting prizes. Now bet on all sports online legal, safe and secure deposit"
            );
            set_h1_title("Online Sports betting - Best Sports Betting App");
            break;
        case "fishing":
            document.title = "Fishing games: Tips and strategies to win";
            addMeta("title", "Play Fishing Games Online and Win Money");
            addMeta(
                "description",
                "Fishing games have become increasingly popular in recent years. Play fishing games online similar to fishing games on PC, Xbox, PS4 etc"
            );
            set_h1_title("Fishing games: Tips and strategies to win");
            break;
        case "blockchain":
            document.title = "Blockchain games Online -  Play and win in blockchain games";
            addMeta("title", "Blockchain Games - Top Blockchain Games  Online");
            addMeta(
                "description",
                "Play the best blockchain games online at 96in.com. We provide the top blockchain games and tips to win money online"
            );
            set_h1_title("Blockchain games Online -  Play and win in blockchain games");
            break;
        case "live":
            document.title = "Live Casino Games Online - Online Casino for Real Money";
            addMeta("title", "Online Casino Games - Online Casino for Real Money");
            addMeta(
                "description",
                "Play all live casino games online in 96in.com such as andar bahar, teen patti, roulette, baccarat etc. Play to win Online Casino for Real Money"
            );
            set_h1_title("Live Casino Games Online - Online Casino for Real Money");
            break;
        case "slot":
            document.title = "Slot games: How to play, rules, tips and strategies";
            addMeta("title", "Slot Games - Best Free Slot Machine Games Online");
            addMeta(
                "description",
                "Slot games are easy to play and offer the excitement of a big win. Now play the best free slot machine games online"
            );
            set_h1_title("Slot games: How to play, rules, tips and strategies");
            break;
        case "lottery":
            document.title = "Lottery games: How to play, rules, tips and strategies";
            addMeta("title", "Lottery Games - Top Lottery Games Online");
            addMeta(
                "description",
                "Play the best lottery games online at 96in.com. We provide the top lottery games and tips to win money online"
            );
            set_h1_title("-");
            break;
        case "cards":
            document.title = "Cards games: How to play, rules, tips and strategies";
            addMeta("title", "Cards Games - Top Cards Games Online");
            addMeta(
                "description",
                "Play the best cards games online at 96in.com. We provide the top cards games and tips to win money online"
            );
            set_h1_title("-");
            break;
        default:
            document.title = LangUtil("KY Casino");
            set_h1_title("-");
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
