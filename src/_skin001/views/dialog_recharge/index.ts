import getProxy from "@/core/global/getProxy";
import DialogRechargeProxy from "./proxy/DialogRechargeProxy";
import DialogRecharge from "./views/DialogRecharge.vue";
import DialogMount from "@/core/global/DialogMount";
import SelfProxy from "@/proxy/SelfProxy";

function show(tabIndex: number = 0) {
    DialogMount(DialogRecharge);
    const proxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    proxy.show();
    proxy.pageData.tabIndex = tabIndex;

    const selfProxy: SelfProxy = getProxy(SelfProxy);
    if (
        (selfProxy.userInfo.is_recharge != 1 && tabIndex == 0) ||
        (selfProxy.userInfo.is_exchange != 1 && tabIndex == 1) ||
        (selfProxy.userInfo.is_gold_transfer != 1 && tabIndex == 2)
    ) {
        if (selfProxy.userInfo.is_recharge == 1) {
            proxy.pageData.tabIndex = 0;
        } else if (selfProxy.userInfo.is_exchange == 1) {
            proxy.pageData.tabIndex = 1;
        } else if (selfProxy.userInfo.is_gold_transfer == 1) {
            proxy.pageData.tabIndex = 2;
        } else {
            proxy.pageData.tabIndex = -1;
        }
    }
    console.log(".>>>>>>>>>>>>>>>", proxy.pageData.tabIndex);

    proxy.exchangeProxy.pageData.form.account = "";
    proxy.exchangeProxy.pageData.form.amount = "";
    proxy.exchangeProxy.api_user_var_exchange_method_list();
    proxy.rechargeProxy.api_user_var_recharge_method_list();
}

export default { show };
