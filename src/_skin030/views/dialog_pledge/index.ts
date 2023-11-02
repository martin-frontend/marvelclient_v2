import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPledgeProxy from "./proxy/DialogPledgeProxy";
import DialogPledge from "./views/DialogPledge.vue";
const proxy: DialogPledgeProxy = getProxy(DialogPledgeProxy);

function show() {
    DialogMount(DialogPledge);
    hidden(false);
    proxy.resetForm();
    proxy.pageData.bShow = true;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
