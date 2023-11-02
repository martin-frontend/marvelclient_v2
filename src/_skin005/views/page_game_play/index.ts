import getProxy from "@/core/global/getProxy";
import PageGamePlayProxy from "./proxy/PageGamePlayProxy";

function show(url: string) {
    //@ts-ignore
    window["vm"].$router.push("/page_game_play");
    const proxy: PageGamePlayProxy = getProxy(PageGamePlayProxy);
    proxy.pageData.url = url;
}

function openOrbitExchange() {
    (window as any).vm.$router.push("/orbit_exchange");
}

export default { show, openOrbitExchange };
