import LoginEnter from "@/_skin005/core/global/LoginEnter";
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
];

/**修正router push 相同页时Avoided redundant navigation to current location 错误 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
    //@ts-ignore
    return originalPush.call(this, location).catch((err: any) => err);
};

const router = new VueRouter({
    routes,
});

// /**没登入 重新导向 */
router.beforeEach((to: any, from: any, next: any) => {
    if (!LangConfig.language[LangConfig.getLangByRouter(to.path)]) {
        if (to.path == "/") {
            if (GameConfig.config.homePage) {
                next(`${GameConfig.config.homePage}/${LangConfig.getRouterLang()}`);
            } else {
                next(`/${LangConfig.getRouterLang()}`);
            }
        } else {
            const pathSplit = to.path.split("/");
            if (pathSplit.length == 4) {
                next(`${pathSplit[1]}/${pathSplit[2]}/${LangConfig.getRouterLang()}`);
            } else {
                next(`${to.path}/${LangConfig.getRouterLang()}`);
            }
        }
    } else {
        if (
            !core.user_id &&
            (to.name == "page_recharge" ||
                to.name == "page_game_soccer" ||
                to.name == "page_game_play" ||
                to.name == "page_my_info" ||
                to.name == "page_statistice_credit")
        ) {
            next(`/${LangConfig.getRouterLang()}`);
        } else {
            if (
                routes.some((e, index, array) => {
                    return e.name == to.name;
                })
            ) {
                if (to.name == "page_game_play" && !PanelUtil.getProxy_gameproxy.currGame.vendor_id) {
                    next(`/${LangConfig.getRouterLang()}`);
                } else next();
            } else {
                console.log("路由不存在", to.path);
                next(`/${LangConfig.getRouterLang()}`);
            }
        }
    }
});
export default router;
