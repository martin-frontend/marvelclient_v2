import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PanelUtil from "@/_skin005/core/PanelUtil";
import LangConfig from "@/core/config/LangConfig";
import GameConfig from "@/core/config/GameConfig";

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "page_home",
        component: () => import(/* webpackChunkName: "skin005_page_home" */ "@/_skin005/views/page_home/views/PageHome.vue"),
    },
    {
        path: "/page_game_list",
        name: "page_game_list",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/page_game_list/:vendor_type",
        name: "page_game_list",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/sports",
        name: "sports",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/live-casino-online",
        name: "live-casino-online",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/blockchain-games",
        name: "blockchain-games",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/fishing-games",
        name: "fishing-games",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/slots-games",
        name: "slots-games",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/lottery-games",
        name: "lottery-games",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/cards-games",
        name: "cards-games",
        component: () => import(/* webpackChunkName: "skin005_page_game_list" */ "@/_skin005/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/page_game_list_chess/",
        name: "page_game_list_chess",
        component: () =>
            import(
                /* webpackChunkName: "skin005_page_game_list_chess" */ "@/_skin001/views/page_game_list_chess/views/PageGameListChess.vue"
            ),
    },
    {
        path: "/page_game_play",
        name: "page_game_play",
        component: () => import(/* webpackChunkName: "skin005_page_game_play" */ "@/_skin005/views/page_game_play/views/PageGamePlay.vue"),
    },
    {
        path: "/page_game_soccer",
        name: "page_game_soccer",
        component: () =>
            import(/* webpackChunkName: "skin005_page_game_soccer" */ "@/_skin005/views/page_game_soccer/views/PageGameSoccer.vue"),
    },
    {
        path: "/cricket",
        name: "cricket",
        component: () =>
            import(/* webpackChunkName: "skin005_page_game_soccer" */ "@/_skin005/views/page_game_soccer/views/PageGameSoccer.vue"),
    },
    {
        path: "/page_introduce",
        name: "page_introduce",
        component: () => import(/* webpackChunkName: "skin005_page_introduce" */ "@/_skin005/views/page_introduce/views/PageIntroduce.vue"),
    },
    {
        path: "/commissions",
        name: "commissions",
        component: () => import(/* webpackChunkName: "skin005_page_extension" */ "@/_skin005/views/page_extension/views/PageExtension.vue"),
    },
    {
        path: "/vip_rewards",
        name: "vip_rewards",
        component: () => import(/* webpackChunkName: "skin005_page_mine" */ "@/_skin005/views/page_mine/views/PageMine.vue"),
    },
    {
        path: "/page_bonus",
        name: "page_bonus",
        component: () => import(/* webpackChunkName: "skin005_page_bonus" */ "@/_skin005/views/page_bonus/views/PageBonus.vue"),
    },
    {
        path: "/page_swap",
        name: "page_swap",
        component: () => import(/* webpackChunkName: "skin005_page_swap" */ "@/_skin005/views/page_swap/views/PageSwap.vue"),
    },
    {
        path: "/page_statistice_credit",
        name: "page_statistice_credit",
        component: () =>
            import(
                /* webpackChunkName: "skin005_page_statistice_credit" */ "@/_skin005/views/page_statistice_credit/views/PageStatisticeCredit.vue"
            ),
    },
    {
        path: "/page_my_info",
        name: "page_my_info",
        component: () => import(/* webpackChunkName: "skin005_page_my_info" */ "@/_skin005/views/page_my_info/views/PageMyInfo.vue"),
    },
    {
        path: "/page_recharge",
        name: "page_recharge",
        component: () => import(/* webpackChunkName: "skin005_page_recharge" */ "@/_skin005/views/page_recharge/views/PageRecharge.vue"),
    },
    {
        path: "/promotions",
        name: "promotions",
        component: () => import(/* webpackChunkName: "skin005_page_activity" */ "@/_skin005/views/page_activity/views/PageActivity.vue"),
    },
    {
        path: "/page_rules",
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

        router = new VueRouter({
            routes,
        });
        router.beforeEach((to: any, from: any, next: any) => {
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
                    (to.path.includes("page_recharge") || to.path.includes("page_my_info") || to.path.includes("page_statistice_credit"))
                ) {
                    next(`${prePath}/${homePage}`);
                } else {
                    if (routes.some((e, index, array) => e.name == to.name)) {
                        if (to.path.includes("page_game_play") && !PanelUtil.getProxy_gameproxy.currGame.vendor_id) {
                            next(`${prePath}/${homePage}`);
                        } else {
                            if (router.mode == "history") changeManifeseJson(to.path);
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
