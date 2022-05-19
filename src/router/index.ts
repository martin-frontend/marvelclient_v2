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
        path: "/introduce",
        name: "Introduce",
        component: () => import(/* webpackChunkName: "introduce" */ "../views/introduce/views/Introduce.vue"),
    },
    {
        path: "/page_extension",
        name: "page_extension",
        component: () => import(/* webpackChunkName: "page_game_play" */ "../views/page_extension/views/PageExtension.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
