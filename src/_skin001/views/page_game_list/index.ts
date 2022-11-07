import getProxy from "@/core/global/getProxy";
import HeaderProxy from "@/_skin001/views/header/proxy/HeaderProxy";
import PageGameListProxy from "./proxy/PageGameListProxy";

function show(category?: number) {
    if (category) {
        const proxy: PageGameListProxy = getProxy(PageGameListProxy);
        const headerProxy: HeaderProxy = getProxy(HeaderProxy);
        headerProxy.categoryActive = category;
        proxy.listQuery.vendor_type = category == 1 ? 0 : category;
        proxy.listQuery.vendor_id = 0;
    }

    //@ts-ignore
    window["vm"].$router.push("/page_game_list");
}

export default { show };
