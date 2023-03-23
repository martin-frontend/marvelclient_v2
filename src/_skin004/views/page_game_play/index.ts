import getProxy from "@/core/global/getProxy";
import PageGamePlayProxy from "./proxy/PageGamePlayProxy";

function show(url: string, bWait: boolean = false) {
    //@ts-ignore
    window["vm"].$router.push("/page_game_play");
    const proxy: PageGamePlayProxy = getProxy(PageGamePlayProxy);
    if (bWait) {
        proxy.pageData.url = "";
        setTimeout(() => {
            proxy.pageData.url = url;
        }, 200);
    } else {
        proxy.pageData.url = url;
    }
}

export default { show };
