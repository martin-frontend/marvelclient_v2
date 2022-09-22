import getProxy from "@/core/global/getProxy";
import PageGameListProxy from "./proxy/PageGameListProxy";

function show(category?: number) {
    if (category && category != 1) {
        const proxy: PageGameListProxy = getProxy(PageGameListProxy);
        proxy.listQuery.vendor_type = category;
        proxy.listQuery.vendor_id = 0;
    }

    //@ts-ignore
    window["vm"].$router.push("/page_game_list");
}

export default { show };
