import getProxy from "@/core/global/getProxy";
import router from "@/router";
import PageGameListProxy from "./proxy/PageGameListProxy";

function show(category?: number) {
    if (category && category != 1) {
        const proxy: PageGameListProxy = getProxy(PageGameListProxy);
        proxy.listQuery.vendor_type = category;
        proxy.listQuery.vendor_id = 0;
    }
    router.push("/page_game_list");
}

export default { show };
