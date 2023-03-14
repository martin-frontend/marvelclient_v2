import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogGameRateProxy from "./proxy/DialogGameRateProxy";
import DialogGameRate from "./views/DialogGameRate.vue";

function show() {
    DialogMount(DialogGameRate);
    const proxy: DialogGameRateProxy = getProxy(DialogGameRateProxy);
    proxy.pageData.bShow = true;
}

export default { show };
