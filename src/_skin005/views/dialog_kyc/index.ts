import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogKycProxy from "./proxy/DialogKycProxy";
import DialogKyc from "./views/DialogKyc.vue";

const proxy: DialogKycProxy = getProxy(DialogKycProxy);
function show() {
    DialogMount(DialogKyc);
    hidden(false);
    proxy.pageData.bShow = true;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
