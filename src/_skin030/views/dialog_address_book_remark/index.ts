import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogAddressBookRemarkProxy from "./proxy/DialogAddressBookRemarkProxy";
import DialogAddressBookRemark from "./views/DialogAddressBookRemark.vue";
const proxy: DialogAddressBookRemarkProxy = getProxy(DialogAddressBookRemarkProxy);

function show() {
    DialogMount(DialogAddressBookRemark);
    hidden(false);
    proxy.pageData.bShow = true;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
