import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogTradePasswordProxy from "./proxy/DialogTradePasswordProxy";
import DialogTradePassword from "./views/DialogTradePassword.vue";

function show() {
    DialogMount(DialogTradePassword);
    const proxy: DialogTradePasswordProxy = getProxy(DialogTradePasswordProxy);
    proxy.show();
}

export default { show };
