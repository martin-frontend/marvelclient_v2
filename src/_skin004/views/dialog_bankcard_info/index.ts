import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBankcardInfoProxy from "./proxy/DialogBankcardInfoProxy";
import DialogBankcardInfo from "./views/DialogBankcardInfo.vue";
import DialogRechargeProxy from "../dialog_recharge/proxy/DialogRechargeProxy";

function show(data: any = null, isGet = false) {
    DialogMount(DialogBankcardInfo);
    const proxy: DialogBankcardInfoProxy = getProxy(DialogBankcardInfoProxy);
    proxy.pageData.bShow = true;
    if (isGet) {
        const rechargeProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
        proxy.pageData.listQuery.block_network_id = rechargeProxy.exchangeProxy.pageData.form.block_network_id;
        proxy.pageData.listQuery.coin_name_unique = rechargeProxy.exchangeProxy.pageData.form.coin_name_unique;
        proxy.api_user_var_payment_method_index();
    } else {
        proxy.setData(data);
    }
}

export default { show };
