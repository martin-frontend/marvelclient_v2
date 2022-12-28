import getProxy from "@/core/global/getProxy";
import PageGameListChessProxy from "./proxy/PageGameListChessProxy";

function show(category: number = 0) {
    if (category && category != 1) {
        const proxy: PageGameListChessProxy = getProxy(PageGameListChessProxy);
        proxy.listQuery.vendor_type = category;
        proxy.listQuery.vendor_id = 0;
    }

    //@ts-ignore
    window["vm"].$router.push("/page_game_list_chess");

    console.log("---page_game_list_chess-004----");
}

export default { show };
