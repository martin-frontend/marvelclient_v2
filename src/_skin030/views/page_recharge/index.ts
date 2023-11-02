import getProxy from "@/core/global/getProxy";
import PageRechargeProxy from "./proxy/PageRechargeProxy";

function show(tabIdx: number = 0, recharge_preset: any = null) {
    //@ts-ignore
    window["vm"].$router.push("/page_recharge");

    const proxy: PageRechargeProxy = getProxy(PageRechargeProxy);

    proxy.pageData.tabIndex = tabIdx + "";
    // if (!recharge_preset) {
    //     recharge_preset = {
    //         coin_name_unique: "",
    //         amount: "",
    //     };
    // }

    // proxy.rechargeProxy.pageData.form.coin_name_unique = recharge_preset.coin_name_unique;
    // proxy.rechargeProxy.pageData.form.amount = recharge_preset.amount;
}

export default { show };
