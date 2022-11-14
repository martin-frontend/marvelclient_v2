import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogAgentManagerProxy from "./proxy/DialogAgentManagerProxy";
import DialogAgentManager from "./views/DialogAgentManager.vue";

function show() {
    DialogMount(DialogAgentManager);
    const proxy: DialogAgentManagerProxy = getProxy(DialogAgentManagerProxy);
    proxy.pageData.bShow = true;
}

export default { show };
