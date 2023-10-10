import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";
import PageGameListProxy from "./proxy/PageGameListProxy";
import LangConfig from "@/core/config/LangConfig";
import Constant from "@/core/global/Constant";

function show(category?: number, vendor_id?: number) {
    const proxy: PageGameListProxy = getProxy(PageGameListProxy);
    //const headerProxy: HeaderProxy = getProxy(HeaderProxy);
    if (category && vendor_id) {
        proxy.isMultChange = true;
    }
    if (category) {
        //PanelUtil.categoryActive = category;
        PanelUtil.getProxy_novigation.categoryActive = category;
        proxy.listQuery.vendor_type = category == 1 ? 2 : category;
        proxy.listQuery.vendor_id = 0;
        //proxy.setGameMenuData(headerProxy.pageData.lobbyIndex);
    } else {
        proxy.getFirstMenuIndex();
    }
    if (vendor_id) {
        proxy.listQuery.vendor_id = vendor_id;
    } else {
        proxy.getFirstItemVendor();
    }
    proxy.getCurItemIndex();
    proxy.getCurMenuIndex();

    //proxy.clearData();
    const path = Constant.getRouterPathByVendor(proxy.listQuery.vendor_type);
    if (path) {
        //@ts-ignore
        window["vm"].$router.push("/" + path);
    } else {
        //@ts-ignore
        window["vm"].$router.push("/page_game_list/" + proxy.listQuery.vendor_type);
    }
    proxy.saveData();
}

export default { show };
