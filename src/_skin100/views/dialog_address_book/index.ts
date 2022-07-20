import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRechargeProxy from "../dialog_recharge/proxy/DialogRechargeProxy";
import DialogAddressBookProxy from "./proxy/DialogAddressBookProxy";
import DialogAddressBook from "./views/DialogAddressBook.vue";

function show() {
    DialogMount(DialogAddressBook);
    const proxy: DialogAddressBookProxy = getProxy(DialogAddressBookProxy);
    const rechargeProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    proxy.pageData.bShow = true;
    proxy.pageData.listQuery.block_network_id = rechargeProxy.exchangeProxy.pageData.form.block_network_id;
    proxy.pageData.listQuery.coin_name_unique = rechargeProxy.exchangeProxy.pageData.form.coin_name_unique;
    proxy.api_user_var_payment_method_index();
}

export default { show };
