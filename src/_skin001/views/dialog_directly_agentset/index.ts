import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyAgentsetProxy from "./proxy/DialogDirectlyAgentsetProxy";
import DialogDirectlyAgentset from "./views/DialogDirectlyAgentset.vue";

function show(agent_user: any = null) {
    DialogMount(DialogDirectlyAgentset);
    const proxy: DialogDirectlyAgentsetProxy = getProxy(DialogDirectlyAgentsetProxy);
    proxy.pageData.bShow = true;
    proxy.setData(agent_user);
}

export default { show };
