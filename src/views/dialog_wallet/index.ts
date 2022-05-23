import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogWalletProxy from "./proxy/DialogWalletProxy";
import DialogWallet from "./views/DialogWallet.vue";

function show() {
    DialogMount(DialogWallet);
    const proxy: DialogWalletProxy = getProxy(DialogWalletProxy);
    proxy.pageData.tabIndex = 0;
    proxy.pageData.bShow = true;
    proxy.api_user_show_var();
}

export default { show };
