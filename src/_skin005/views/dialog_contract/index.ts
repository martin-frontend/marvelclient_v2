import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogContractProxy from "./proxy/DialogContractProxy";
import DialogContract from "./views/DialogContract.vue";
const proxy: DialogContractProxy = getProxy(DialogContractProxy);

function show() {
    DialogMount(DialogContract);
    hidden(false);
    proxy.pageData.bShow = true;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
