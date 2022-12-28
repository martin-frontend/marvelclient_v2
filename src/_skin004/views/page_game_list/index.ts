import getProxy from "@/core/global/getProxy";
import HeaderProxy from "@/_skin004/views/header/proxy/HeaderProxy";
import PageGameListProxy from "./proxy/PageGameListProxy";

function show(category?: number, vendor_id?: number) {
    const proxy: PageGameListProxy = getProxy(PageGameListProxy);
    const headerProxy: HeaderProxy = getProxy(HeaderProxy);
    if (category && vendor_id) {
        proxy.isMultChange = true;
    }
    if (category) {

        headerProxy.categoryActive = category;
        proxy.listQuery.vendor_type = category == 1 ? 2 : category;
        proxy.listQuery.vendor_id = 1;
        //proxy.setGameMenuData(headerProxy.pageData.lobbyIndex);
    }
    else {
        console.log("1123123",proxy.curItemIndex);
        proxy.getFirstMenuIndex();
    }
    if (vendor_id) {
        proxy.listQuery.vendor_id = vendor_id;
    }
    else {
        proxy.getFirstItemVendor();
    }
    console.log("当前值 proxy.listQuery.vendor_type ", proxy.listQuery.vendor_type);
    console.log("当前值 proxy.listQuery.vendor_id ", proxy.listQuery.vendor_id);
    proxy.getCurItemIndex();
    proxy.getCurMenuIndex();
    //@ts-ignore
    window["vm"].$router.push("/page_game_list");
    proxy.saveData();
}

export default { show };
