import getProxy from "@/core/global/getProxy";
import Vue from "vue";
import PageGameSoccerProxy from "./proxy/PageGameSoccerProxy";

function show(url: string, isCricket: boolean = false) {
    // window["vm"].$router.push("/page_game_soccer");
    //Vue.router.push("/page_game_soccer");
    if (isCricket) {
        Vue.router.push("/cricket");
    }
    else {
        Vue.router.push("/page_game_soccer");
    }
    const proxy: PageGameSoccerProxy = getProxy(PageGameSoccerProxy);
    proxy.pageData.isAction = true;
    proxy.pageData.url = url;
}

export default { show };
