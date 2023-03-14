import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogContractProxy from "./proxy/DialogContractProxy";
import DialogContract from "./views/DialogContract.vue";

function show() {
    DialogMount(DialogContract);
    const proxy: DialogContractProxy = getProxy(DialogContractProxy);
    proxy.pageData.bShow = true;
}

export default { show };
