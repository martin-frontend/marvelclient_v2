import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import PageGameListProxy from "./proxy/PageGameListProxy";
import LangConfig from "@/core/config/LangConfig";

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
        proxy.listQuery.vendor_id = 1;
        //proxy.setGameMenuData(headerProxy.pageData.lobbyIndex);
    } else {
        console.log("1123123", proxy.curItemIndex);
        proxy.getFirstMenuIndex();
    }
    if (vendor_id) {
        proxy.listQuery.vendor_id = vendor_id;
    } else {
        proxy.getFirstItemVendor();
    }
    console.log("当前值 proxy.listQuery.vendor_type ", proxy.listQuery.vendor_type);
    console.log("当前值 proxy.listQuery.vendor_id ", proxy.listQuery.vendor_id);
    console.log("当前值 categoryActive ", PanelUtil.getProxy_novigation.categoryActive);
    proxy.getCurItemIndex();
    proxy.getCurMenuIndex();

    const path = getRouterPathByVendor(proxy.listQuery.vendor_type);
    if (path) {
        //@ts-ignore
        window["vm"].$router.push("/" + path);
    } else {
        //@ts-ignore
        window["vm"].$router.push("/page_game_list/" + proxy.listQuery.vendor_type);
    }
    proxy.saveData();
}

function getRouterPathByVendor(vendor: number): string {
    switch (vendor) {
        case 2:
            return "cards-games"; //     2	棋牌
        case 4:
            return "lottery-games"; // 4	彩票
        case 8:
            return "fishing-games"; // 8	捕鱼
        case 16:
            return "slots-games"; // 16	电子
        case 32:
            return "live-casino-online"; // 32	真人
        case 64:
            return "sports"; // 64	体育电竞
        case 128:
            return "blockchain-games"; // 128	链游
    }
    return "";
}
export default { show };
