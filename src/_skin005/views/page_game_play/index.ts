import Vue from "vue";
import getProxy from "@/core/global/getProxy";
import PageGamePlayProxy from "./proxy/PageGamePlayProxy";

function show(url: string) {
    // 将url存起来，seo页面跳转时，从这里拿数据
    localStorage.setItem("game_play_url", url);

    Vue.router.push("/page_game_play");
    const proxy: PageGamePlayProxy = getProxy(PageGamePlayProxy);
    proxy.pageData.url = url;
}

function openOrbitExchange() {
    (window as any).vm.$router.push("/orbit_exchange");
}

export default { show, openOrbitExchange };
