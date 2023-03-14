import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogWalletSetProxy from "./proxy/DialogWalletSetProxy";
import DialogWalletSet from "./views/DialogWalletSet.vue";

function show() {
    DialogMount(DialogWalletSet);
    const proxy: DialogWalletSetProxy = getProxy(DialogWalletSetProxy);
    proxy.pageData.bShow = true;
}

export default { show };
