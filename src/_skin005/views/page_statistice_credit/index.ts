import getProxy from "@/core/global/getProxy";
import PageStatisticeCreditProxy from "./proxy/PageStatisticeCreditProxy";

function show(nub:number = 0) {
    //@ts-ignore
    window["vm"].$router.push("/page_statistice_credit");

    const proxy: PageStatisticeCreditProxy = getProxy(PageStatisticeCreditProxy);

    proxy.setShowType(nub);
}

export default { show };
