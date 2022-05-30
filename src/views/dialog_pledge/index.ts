import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPledgeProxy from "./proxy/DialogPledgeProxy";
import DialogPledge from "./views/DialogPledge.vue";

function show() {
    DialogMount(DialogPledge);
    const proxy: DialogPledgeProxy = getProxy(DialogPledgeProxy);
    proxy.pageData.bShow = true;
}

export default { show };
