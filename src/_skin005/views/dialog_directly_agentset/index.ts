import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyAgentsetProxy from "./proxy/DialogDirectlyAgentsetProxy";
import DialogDirectlyAgentset from "./views/DialogDirectlyAgentset.vue";
const proxy: DialogDirectlyAgentsetProxy = getProxy(DialogDirectlyAgentsetProxy);

function show(agent_user: any = null) {
    DialogMount(DialogDirectlyAgentset);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.setData(agent_user);
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
