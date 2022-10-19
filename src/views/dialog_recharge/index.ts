import getProxy from "@/core/global/getProxy";
import DialogRechargeProxy from "./proxy/DialogRechargeProxy";
import DialogRecharge from "./views/DialogRecharge.vue";
import DialogMount from "@/core/global/DialogMount";

function show(tabIndex: number = 0) {
    DialogMount(DialogRecharge);
    const proxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    proxy.show();
    proxy.pageData.tabIndex = tabIndex;
    proxy.exchangeProxy.pageData.form.account = "";
    proxy.exchangeProxy.pageData.form.amount = "";
    proxy.exchangeProxy.api_user_var_exchange_method_list();
    proxy.rechargeProxy.api_user_var_recharge_method_list();
}

export default { show };
