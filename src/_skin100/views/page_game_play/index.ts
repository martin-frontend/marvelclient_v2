import getProxy from "@/core/global/getProxy";
import router from "@/_skin100/router";
import PageGamePlayProxy from "./proxy/PageGamePlayProxy";

function show(url: string) {
    router.push("/page_game_play");
    const proxy: PageGamePlayProxy = getProxy(PageGamePlayProxy);
    proxy.pageData.url = url;
}

export default { show };
