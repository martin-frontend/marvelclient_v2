import getProxy from "@/core/global/getProxy";
import PageGameSoccerProxy from "./proxy/PageGameSoccerProxy";

function show(url:string) {
    //@ts-ignore
    window["vm"].$router.push("/page_game_soccer");
    const proxy: PageGameSoccerProxy = getProxy(PageGameSoccerProxy);
    proxy.pageData.isAction = true;
    proxy.pageData.url = url;
}

export default { show };
