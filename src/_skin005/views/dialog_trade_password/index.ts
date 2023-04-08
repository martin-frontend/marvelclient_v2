import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogTradePasswordProxy from "./proxy/DialogTradePasswordProxy";
import DialogTradePassword from "./views/DialogTradePassword.vue";
const proxy: DialogTradePasswordProxy = getProxy(DialogTradePasswordProxy);

function show() {
    DialogMount(DialogTradePassword);
    hidden(false);
    proxy.show();
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
