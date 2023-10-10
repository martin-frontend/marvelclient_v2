import Constant from "@/core/global/Constant";
import PageCasinoListProxy from "./proxy/PageCasinoListProxy";
import getProxy from "@/core/global/getProxy";

function show(category?: number, vendor_id?: number) {
    const proxy: PageCasinoListProxy = getProxy(PageCasinoListProxy);
    category = category || 0;
    proxy.setQueryData(category, vendor_id);
    // //@ts-ignore
    // window["vm"].$router.push("/page_casino_list");
    const path = Constant.getRouterPathByVendor(proxy.listQuery.vendor_type);
    if (path) {
        //@ts-ignore
        window["vm"].$router.push("/" + path);
    }
    if (!category && !vendor_id) {
        proxy.isVendor = true;
    } else {
        proxy.isVendor = false;
    }
    /**需要显示的为厂商 */
    if (!category) {
        //@ts-ignore
        window["vm"].$router.push("/vendor");
    }
    proxy.init();
}

export default { show };
