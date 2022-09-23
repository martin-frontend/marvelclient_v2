import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogAddressBookRemarkProxy from "./proxy/DialogAddressBookRemarkProxy";
import DialogAddressBookRemark from "./views/DialogAddressBookRemark.vue";

function show() {
    DialogMount(DialogAddressBookRemark);
    const proxy: DialogAddressBookRemarkProxy = getProxy(DialogAddressBookRemarkProxy);
    proxy.pageData.bShow = true;
}

export default { show };
