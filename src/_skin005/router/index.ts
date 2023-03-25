import LoginEnter from "@/_skin005/core/global/LoginEnter";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PanelUtil from "@/_skin005/core/PanelUtil";
import LangConfig from "@/core/config/LangConfig";

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
        path: "/page_game_soccer_cricket/:lang",
        name: "page_game_soccer_cricket",
        component: () =>
            import(/* webpackChunkName: "skin005_page_game_soccer" */ "@/_skin005/views/page_game_soccer/views/PageGameSoccer.vue"),
    },
    {
        path: "/page_introduce/:lang",
        name: "page_introduce",
        component: () => import(/* webpackChunkName: "skin005_page_introduce" */ "@/_skin005/views/page_introduce/views/PageIntroduce.vue"),
    },
    {
        path: "/page_extension/:lang",
        name: "page_extension",
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
        path: "/page_activity/:lang",
        name: "page_activity",
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

const router = new VueRouter({
    // mode: process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV == "production" ? "history" : "hash",
    // mode: 'history',
    routes,
});

// /**没登入 重新导向 */
router.beforeEach((to: any, from: any, next: any) => {
    if (to.path.indexOf("page_game_soccer_cricket") != -1) {
        addMetaWithType("cricket");
    } else if (to.path.indexOf("page_game_soccer") != -1) {
        addMetaWithType("sports");
    } else if (to.path.indexOf("page_game_list/128/") != -1) {
        addMetaWithType("blockchain");
    } else if (to.path.indexOf("page_game_list/8/") != -1) {
        addMetaWithType("fishing");
    } else if (to.path.indexOf("page_game_list/32/") != -1) {
        addMetaWithType("live");
    } else if (to.path.indexOf("page_game_list/16/") != -1) {
        addMetaWithType("slot");
    }

    if (!LangConfig.language[to.path.split("/").reverse()[0]]) {
        if (to.path == "/") {
            PanelUtil.openpage_soccer_cricket();
            PanelUtil.openpage_sport("", true);
        } else {
            const pathSplit = to.path.split("/");
            if (pathSplit.length == 4) {
                next(`${pathSplit[1]}/${pathSplit[2]}/${core.lang}`);
            } else {
                next(`${to.path}/${core.lang}`);
            }
        }
    } else {
        if (
            !core.user_id &&
            (to.name == "page_recharge" ||
                to.name == "page_game_play" ||
                to.name == "page_my_info" ||
                to.name == "page_statistice_credit" ||
                to.name == "page_game_soccer")
        ) {
            next(`/${core.lang}`);
        } else {
            if (to.name == "page_game_soccer_cricket" && !PanelUtil.getProxy_gameproxy.currGame.vendor_id) {
                PanelUtil.openpage_soccer_cricket();
            } else next();
        }
    }
});

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
    }
}
function addMeta(name: string, content: string) {
    const meta = document.createElement("meta");
    meta.content = content;
    meta.name = name;
    document.getElementsByTagName("head")[0].appendChild(meta);
    metaArr.push(meta);
}

export default router;
