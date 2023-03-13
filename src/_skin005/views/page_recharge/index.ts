import getProxy from "@/core/global/getProxy";
import PageRechargeProxy from "./proxy/PageRechargeProxy";

function show(tabIdx: number = 0) {
    //@ts-ignore
    window["vm"].$router.push("/page_recharge");

    const proxy: PageRechargeProxy = getProxy(PageRechargeProxy);

    proxy.pageData.tabIndex = tabIdx + "";
    console.log("传入的值 为", tabIdx);
}

export default { show };
