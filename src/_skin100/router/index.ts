import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "page_home",
        component: () => import(/* webpackChunkName: "skin100_page_home" */ "@/_skin100/views/page_home/views/PageHome.vue"),
    },
    {
        path: "/page_game_list",
        name: "page_game_list",
        component: () => import(/* webpackChunkName: "skin100_page_game_list" */ "@/_skin100/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/page_game_play",
        name: "page_game_play",
        component: () => import(/* webpackChunkName: "skin100_page_game_play" */ "@/_skin100/views/page_game_play/views/PageGamePlay.vue"),
    },
    {
        path: "/page_extension",
        name: "page_extension",
        component: () => import(/* webpackChunkName: "skin100_page_extension" */ "@/_skin100/views/page_extension/views/PageExtension.vue"),
    },
    {
        path: "/page_mine",
        name: "page_mine",
        component: () => import(/* webpackChunkName: "skin100_page_mine" */ "@/_skin100/views/page_mine/views/PageMine.vue"),
    },
    {
        path: "/page_bonus",
        name: "page_bonus",
        component: () => import(/* webpackChunkName: "skin100_page_bonus" */ "@/_skin100/views/page_bonus/views/PageBonus.vue"),
    },
    {
        path: "/page_swap",
        name: "page_swap",
        component: () => import(/* webpackChunkName: "skin100_page_swap" */ "@/_skin100/views/page_swap/views/PageSwap.vue"),
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
    if (!core.user_id && to.name !== "page_home" && to.name !== "page_game_list" && to.name !== "page_swap") {
        next("/");
    } else {
        next();
    }
});
export default router;
