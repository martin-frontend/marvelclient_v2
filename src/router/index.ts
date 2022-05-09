import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: () => import(/* webpackChunkName: "home" */ "../views/home/views/Home.vue"),
    },
    {
        path: "/introduce",
        name: "Introduce",
        component: () => import(/* webpackChunkName: "introduce" */ "../views/introduce/views/Introduce.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
