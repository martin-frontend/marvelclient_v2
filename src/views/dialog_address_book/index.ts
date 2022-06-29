import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogAddressBookProxy from "./proxy/DialogAddressBookProxy";
import DialogAddressBook from "./views/DialogAddressBook.vue";

function show() {
    DialogMount(DialogAddressBook);
    const proxy: DialogAddressBookProxy = getProxy(DialogAddressBookProxy);
    proxy.pageData.bShow = true;
    proxy.api_user_var_exchange_method_list();
}

export default { show };
