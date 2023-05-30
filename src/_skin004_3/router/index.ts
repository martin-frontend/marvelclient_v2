import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "page_home",
        component: () => import(/* webpackChunkName: "skin001_page_home" */ "@/_skin004_3/views/page_home/views/PageHome.vue"),
    },
    {
        path: "/page_game_list",
        name: "page_game_list",
        component: () => import(/* webpackChunkName: "page_game_list" */ "@/_skin004_3/views/page_game_list/views/PageGameList.vue"),
    },
    {
        path: "/page_game_list_chess",
        name: "page_game_list_chess",
        component: () =>
            import(
                /* webpackChunkName: "skin001_page_game_list_chess" */ "@/_skin004/views/page_game_list_chess/views/PageGameListChess.vue"
            ),
    },
    {
        path: "/page_game_play",
        name: "page_game_play",
        component: () => import(/* webpackChunkName: "skin001_page_game_play" */ "@/_skin004/views/page_game_play/views/PageGamePlay.vue"),
    },
    {
        path: "/page_game_soccer",
        name: "page_game_soccer",
        component: () =>
            import(/* webpackChunkName: "skin001_page_game_soccer" */ "@/_skin004/views/page_game_soccer/views/PageGameSoccer.vue"),
    },
    {
        path: "/page_introduce",
        name: "page_introduce",
        component: () => import(/* webpackChunkName: "page_introduce" */ "@/views/page_introduce/views/PageIntroduce.vue"),
    },
    {
        path: "/page_extension",
        name: "page_extension",
        component: () => import(/* webpackChunkName: "page_extension" */ "@/_skin004_3/views/page_extension/views/PageExtension.vue"),
    },
    {
        path: "/page_mine",
        name: "page_mine",
        component: () => import(/* webpackChunkName: "page_mine" */ "@/_skin004/views/page_mine/views/PageMine.vue"),
    },
    {
        path: "/page_bonus",
        name: "page_bonus",
        component: () => import(/* webpackChunkName: "page_bonus" */ "@/views/page_bonus/views/PageBonus.vue"),
    },
    {
        path: "/page_swap",
        name: "page_swap",
        component: () => import(/* webpackChunkName: "page_swap" */ "@/views/page_swap/views/PageSwap.vue"),
    },
    {
        path: "/page_activity",
        name: "page_activity",
        component: () => import(/* webpackChunkName: "skin004_page_activity" */ "@/_skin004_3/views/page_activity/views/PageActivity.vue"),
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
    if (
        !core.user_id &&
        to.name !== "page_home" &&
        to.name !== "page_game_list" &&
        to.name !== "page_introduce" &&
        to.name !== "page_swap" &&
        to.name !== "page_activity"
    ) {
        next("/");
    } else {
        // console.log("去向 的 地址1" , Vue.vuetify);
        //  console.log("去向 的 地址" , Vue.vuetify.framework.breakpoint.mobile);

        // if (Vue.vuetify.framework.breakpoint.mobile && to.name == "page_home")
        // {
        //     next("page_game_list");
        //     //page_game_list.show();
        //     return;
        // }

        next();
    }
});
export default router;
