import SelfProxy from "@/proxy/SelfProxy";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "page_home",
        // component: () => import(/* webpackChunkName: "home" */ "../views/home/views/Home.vue"),
        component: () => import(/* webpackChunkName: "page_home" */ "../views/page_home/views/PageHome.vue"),
    },
    // {
    //     path: "/gamelist",
    //     name: "GameList",
    //     component: () => import(/* webpackChunkName: "gamelist" */ "../views/gamelist/views/GameList.vue"),
    // },
    {
        path: "/page_game_list",
        name: "page_game_list",
        component: () => import(/* webpackChunkName: "page_game_list" */ "../views/page_game_list/views/PageGameList.vue"),
    },
    // {
    //     path: "/gameplay",
    //     name: "GamePlay",
    //     component: () => import(/* webpackChunkName: "gameplay" */ "../views/gameplay/views/GamePlay.vue"),
    // },
    {
        path: "/page_game_play",
        name: "page_game_play",
        component: () => import(/* webpackChunkName: "page_game_play" */ "../views/page_game_play/views/PageGamePlay.vue"),
    },
    {
        path: "/page_introduce",
        name: "page_introduce",
        component: () => import(/* webpackChunkName: "introduce" */ "../views/page_introduce/views/PageIntroduce.vue"),
    },
    {
        path: "/page_extension",
        name: "page_extension",
        component: () => import(/* webpackChunkName: "page_extension" */ "../views/page_extension/views/PageExtension.vue"),
    },
    {
        path: "/page_mine",
        name: "page_mine",
        component: () => import(/* webpackChunkName: "page_mine" */ "../views/page_mine/views/PageMine.vue"),
    },
    {
        path: "/page_bonus",
        name: "page_bonus",
        component: () => import(/* webpackChunkName: "page_bonus" */ "../views/page_bonus/views/PageBonus.vue"),
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
    if (!core.user_id && to.name !== "page_home" && to.name !== "page_game_list" && to.name !== "page_introduce") {
        next("/");
    } else {
        next();
    }
});
export default router;
