import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogWalletProxy from "./proxy/DialogWalletProxy";
import DialogWallet from "./views/DialogWallet.vue";

function show(tabIdx: number = 0, type?: number) {
    DialogMount(DialogWallet);
    const proxy: DialogWalletProxy = getProxy(DialogWalletProxy);
    proxy.pageData.tabIndex = tabIdx;
    if (tabIdx == 2) {
        if (type) {
            proxy.pageData.listQuery.type = type;
            proxy.pageData.listOptions.typeSelect = type;
        }
        proxy.api_user_show_var_gold();
    } else {
        proxy.pageData.listQuery.type = 0;
        proxy.pageData.listOptions.typeSelect = 0;
    }
    proxy.pageData.bShow = true;
    proxy.api_user_show_var();
}

export default { show };
