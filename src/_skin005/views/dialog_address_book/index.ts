import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import DialogAddressBookProxy from "./proxy/DialogAddressBookProxy";
import DialogAddressBook from "./views/DialogAddressBook.vue";

const proxy: DialogAddressBookProxy = getProxy(DialogAddressBookProxy);
function show() {
    DialogMount(DialogAddressBook);

    const rechargeProxy = PanelUtil.getProxy_recharge;
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.pageData.listQuery.block_network_id = rechargeProxy.exchangeProxy.pageData.form.block_network_id;
    proxy.pageData.listQuery.coin_name_unique = rechargeProxy.exchangeProxy.pageData.form.coin_name_unique;
    proxy.api_user_var_payment_method_index();
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
