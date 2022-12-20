import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogWalletProxy from "./proxy/DialogWalletProxy";
import DialogWallet from "./views/DialogWallet.vue";

function show(tabIdx: number = 0, type?: number,coinName?:string) {
    DialogMount(DialogWallet);
    const proxy: DialogWalletProxy = getProxy(DialogWalletProxy);
    proxy.pageData.tabIndex = tabIdx;
    if (tabIdx == 2) {
        if (type) {
            proxy.pageData.listQuery.type = type;
            proxy.pageData.listOptions.typeSelect = type;
        }
        if (coinName)
        {
            proxy.pageData.listQuery.coin_name_unique = coinName;
            proxy.pageData.listOptions.coinSelect = proxy.getCoinIndex(coinName) ;
            proxy.pageData.listOptions.timeSelect = 3;

            proxy.pageData.listQuery.start_date = core.dateFormat(core.getTodayOffset(-29), "yyyy-MM-dd");
            proxy.pageData.listQuery.end_date = core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd");
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
